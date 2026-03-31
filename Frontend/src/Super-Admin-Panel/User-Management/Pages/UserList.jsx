import React, { useState } from "react";
import { useUsers } from "../Hooks/useUsers";
import { userService } from "../Services/userService";
import UserTable from "../Components/UserTable";
import UserSearch from "../Components/UserSearch"; // Import the new search component
import { Users, UserPlus } from "lucide-react";

const UserList = () => {
  const { users, loading, searchTerm, setSearchTerm, refresh } = useUsers();
  const [processingId, setProcessingId] = useState(null);

  // Logic to clear the search input
  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const handleStatusToggle = async (id) => {
    setProcessingId(id);
    try {
      await userService.toggleStatus(id);
      refresh();
    } catch (err) {
      alert("Status update failed");
    } finally {
      setProcessingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure? This will remove the user permanently."))
      return;
    try {
      await userService.deleteUser(id);
      refresh();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-3">
            <Users className="text-emerald-500" /> User Directory
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Manage system permissions and access levels.
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all active:scale-95">
          <UserPlus size={20} /> Add New Admin
        </button>
      </div>

      {/* Modernized Search Header using Component */}
      <UserSearch
        value={searchTerm}
        onChange={setSearchTerm}
        onClear={handleClearSearch}
        isLoading={loading}
      />

      {/* User Table Container */}
      <div className="bg-slate-50/50 p-2 rounded-[2.5rem] border border-slate-100 min-h-[400px]">
        {!loading && users.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-20 text-center">
            <div className="bg-white p-6 rounded-full shadow-sm mb-4">
              <Users size={40} className="text-slate-200" />
            </div>
            <p className="text-slate-400 font-bold italic">
              No users found matching your search criteria.
            </p>
            <button
              onClick={handleClearSearch}
              className="mt-4 text-emerald-600 font-bold text-sm hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <UserTable
            users={users}
            onToggleStatus={handleStatusToggle}
            onDelete={handleDelete}
            processingId={processingId}
          />
        )}
      </div>
    </div>
  );
};

export default UserList;
