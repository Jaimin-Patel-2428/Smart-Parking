import React, { useState } from "react";
import { useUsers } from "../Hooks/useUsers";
import { userService } from "../Services/userService";
import UserTable from "../Components/UserTable";
import UserSearch from "../Components/UserSearch";
import { Users, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ConfirmDialog from "../../../app/Components/ConfirmDialog";

const UserList = () => {
  const { users, loading, searchTerm, setSearchTerm, refresh } = useUsers();
  const [processingId, setProcessingId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const navigate = useNavigate();

  // Theme Variables:
  // Background: #222222 | Text: #FAF3E1 | Accent: #FA8112 | Border: #F5E7C6/10

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const handleStatusToggle = async (id) => {
    setProcessingId(id);
    try {
      await userService.toggleStatus(id);
      toast.success("Status updated successfully");
      refresh();
    } catch (err) {
      toast.error(err.response?.data?.message || "Status update failed");
    } finally {
      setProcessingId(null);
    }
  };

  const handleDelete = async (id) => {
    setUserToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;
    const id = userToDelete;
    setShowDeleteConfirm(false);
    setUserToDelete(null);

    try {
      await userService.deleteUser(id);
      toast.success("User deleted successfully");
      refresh();
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10 bg-[#222222]">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-[#FAF3E1] uppercase tracking-tighter flex items-center gap-4">
            <Users className="text-[#FA8112]" size={32} />
            User <span className="text-[#FA8112]">Directory</span>
          </h1>
          <p className="text-[#FAF3E1]/40 text-xs font-black uppercase tracking-[0.2em] mt-1">
            Manage system permissions and access levels.
          </p>
        </div>
        <button
          onClick={() => navigate("/super-admin/create-admin")}
          className="flex items-center justify-center gap-3 bg-[#FA8112] text-[#222222] px-8 py-3.5 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-lg shadow-[#FA8112]/10 hover:bg-[#FAF3E1] transition-all active:scale-95"
        >
          <UserPlus size={20} /> Add New Admin
        </button>
      </div>

      {/* Modernized Search Header */}
      <UserSearch
        value={searchTerm}
        onChange={setSearchTerm}
        onClear={handleClearSearch}
        isLoading={loading}
      />

      {/* User Table Container */}
      <div className="bg-[#FAF3E1]/[0.02] p-2 rounded-[2.5rem] border border-[#F5E7C6]/10 shadow-sm min-h-[500px]">
        {!loading && users.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-24 text-center">
            <div className="bg-[#FAF3E1]/[0.05] p-10 rounded-full border border-[#F5E7C6]/5 mb-6 text-[#FAF3E1]/10">
              <Users size={64} />
            </div>
            <p className="text-[#FAF3E1]/40 font-black uppercase tracking-[0.2em] text-sm">
              No matching profiles found in database.
            </p>
            <button
              onClick={handleClearSearch}
              className="mt-6 text-[#FA8112] font-black text-xs uppercase tracking-widest hover:text-[#FAF3E1] transition-colors underline underline-offset-8"
            >
              Reset Search Parameters
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

      {/* System Note */}
      <div className="text-center">
        <p className="text-[9px] font-black text-[#FAF3E1]/20 uppercase tracking-[0.3em]">
          Identity Access Management Node • v1.0.9
        </p>
      </div>
      <ConfirmDialog
        open={showDeleteConfirm}
        title="Remove User"
        message="Are you sure? This will remove the user permanently."
        confirmLabel="Remove"
        intent="danger"
        onConfirm={confirmDelete}
        onCancel={() => {
          setShowDeleteConfirm(false);
          setUserToDelete(null);
        }}
      />
    </div>
  );
};

export default UserList;
