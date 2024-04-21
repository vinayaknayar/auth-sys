"use client";
import * as React from "react";
import {
	CaretSortIcon,
	ChevronDownIcon,
	DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { MdDelete } from "react-icons/md";

import { UserRole } from "@prisma/client";
import { dashboard, deleteUser } from "@/actions/auth/dashboard";
import { RoleGate } from "@/components/auth/role-gate";
import { admin } from "@/actions/auth/admin";

export type User = {
	id: string;
	email: string;
	role: string;
};

export default function DashBoard() {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});
	const [tableData, setTableData] = React.useState<User[]>([]);

	const columns: ColumnDef<User>[] = [
		{
			id: "select",
			header: ({ table }) => (
				<Checkbox
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && "indeterminate")
					}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
					aria-label="Select all"
				/>
			),
			cell: ({ row }) => (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label="Select row"
				/>
			),
			enableSorting: false,
			enableHiding: false,
		},
		{
			accessorKey: "id",
			header: "ID",
			cell: ({ row }) => <div>{row.getValue("id")}</div>,
		},
		{
			accessorKey: "email",
			header: "Email",
			cell: ({ row }) => <div>{row.getValue("email")}</div>,
		},
		{
			accessorKey: "role",
			header: "Role",
			cell: ({ row }) => <div>{row.getValue("role")}</div>, // Display role
		},
		{
			id: "actions",
			enableHiding: false,
			cell: ({ row }) => {
				const user = row.original;

				const handleDelete = async () => {
					try {
						await deleteUser(user.id);
						setTableData((prevData) => prevData.filter((u) => u.id !== user.id));
						console.log("Deleted user with ID:", user.id);
					} catch (error) {
						console.error("Error deleting user:", error);
					}
				};

				return (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="h-8 w-8 p-0">
								<span className="sr-only">Open menu</span>
								<DotsHorizontalIcon className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuItem onSelect={handleDelete}>Delete</DropdownMenuItem>
							{/* Other menu items if needed */}
						</DropdownMenuContent>
					</DropdownMenu>
				);
			},
		},
	];

	const table = useReactTable<User>({
		data: tableData,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	const handleDeleteSelected = async () => {
		try {
			const selectedRows = table.getFilteredSelectedRowModel().rows;
			const selectedIds = selectedRows.map((row) => row.original.id);
			await Promise.all(selectedIds.map((id) => deleteUser(id)));
			setTableData((prevData) => prevData.filter((user) => !selectedIds.includes(user.id)));
			console.log("Deleted selected users:", selectedIds);
		} catch (error) {
			console.error("Error deleting selected users:", error);
		}
	};

	// Fetch users from the database on component mount
	React.useEffect(() => {
		const fetchUsers = async () => {
			try {
				const users = await dashboard();
				if (users) {
					const formattedUsers = users.map(user => ({
						...user,
						email: user.email ?? "No Email", 
					}));
					setTableData(formattedUsers); 
				} else {
					console.error("Received null value from dashboard()");
				}
			} catch (error) {
				console.error("Error fetching users:", error);
			}
		};

		fetchUsers();
	}, []);

	return (
		<RoleGate allowedRole={UserRole.ADMIN}>
			<div className="w-full sm:w-3/4 px-4">
				<div className="flex items-center py-4 gap-1">
					<Input
						placeholder="Filter emails..."
						value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
						onChange={(event) =>
							table.getColumn("email")?.setFilterValue(event.target.value)
						}
						className="max-w-sm"
					/>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" className="ml-auto">
								Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							{table
								.getAllColumns()
								.filter((column) => column.getCanHide())
								.map((column) => {
									return (
										<DropdownMenuCheckboxItem
											key={column.id}
											className="capitalize"
											checked={column.getIsVisible()}
											onCheckedChange={(value) =>
												column.toggleVisibility(!!value)
											}
										>
											{column.id}
										</DropdownMenuCheckboxItem>
									);
								})}
						</DropdownMenuContent>
					</DropdownMenu>
					<Button onClick={handleDeleteSelected}>
						<MdDelete className="h-8 w-8 text-red-500" />
					</Button>
				</div>
				<div className="rounded-md border bg-gray-100 text-black">
					<Table>
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => {
										return (
											<TableHead key={header.id}>
												{header.isPlaceholder
													? null
													: flexRender(
														header.column.columnDef.header,
														header.getContext()
													)}
											</TableHead>
										);
									})}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row) => (
									<TableRow
										key={row.id}
										data-state={row.getIsSelected() && "selected"}
									>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</TableCell>
										))}
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell
										colSpan={columns.length}
										className="h-24 text-center"
									>
										No results.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
				<div className="flex items-center justify-end space-x-2 py-4">
					<div className="flex-1 text-sm text-muted-foreground">
						{table.getFilteredSelectedRowModel().rows.length} of{" "}
						{table.getFilteredRowModel().rows.length} row(s) selected.
					</div>
					<div className="space-x-2">
						<Button
							variant="outline"
							size="sm"
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
						>
							Previous
						</Button>
						<Button
							variant="outline"
							size="sm"
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
						>
							Next
						</Button>
					</div>
				</div>
			</div>
		</RoleGate>
	);
}
