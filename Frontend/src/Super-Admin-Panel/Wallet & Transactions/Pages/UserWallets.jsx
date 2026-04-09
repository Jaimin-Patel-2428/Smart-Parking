import { walletService } from "../Services/walletService";
import UserWalletTable from "../Components/UserWalletTable";
import { Wallet, Search, ArrowUpDown } from "lucide-react";
import { useState, useEffect } from "react";

const UserWallets = () => {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Theme Variables:
  // Background: #222222 | Text: #FAF3E1 | Accent: #FA8112 | Border: #F5E7C6/10

  const fetchWallets = async () => {
    try {
      setLoading(true);
      const res = await walletService.getAllUserWallets();
      setWallets(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWallets();
  }, []);

  const filteredWallets = wallets.filter(
    (w) =>
      w.user?.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      w.user?.email?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10 bg-[#222222]">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-[#FAF3E1] uppercase tracking-tighter flex items-center gap-4">
            <Wallet className="text-[#FA8112]" size={32} />
            Wallet <span className="text-[#FA8112]">Directory</span>
          </h1>
          <p className="text-[#FAF3E1]/40 text-xs font-black uppercase tracking-[0.2em] mt-1">
            Monitoring individual account balances across the network.
          </p>
        </div>
      </div>

      {/* Search and Sort Header */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 group w-full">
          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 text-[#FAF3E1]/20 group-focus-within:text-[#FA8112] transition-colors"
            size={20}
          />
          <input
            type="text"
            placeholder="Search by name or digital address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-14 pr-8 py-5 bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/10 rounded-2xl text-[#FAF3E1] placeholder-[#FAF3E1]/20 focus:outline-none focus:border-[#FA8112] focus:ring-1 focus:ring-[#FA8112]/20 font-medium transition-all shadow-sm"
          />
        </div>

        {/* Sort Badge - Styled as a tactical tag */}
        <div className="bg-[#FAF3E1]/[0.05] px-8 py-5 rounded-2xl border border-[#F5E7C6]/10 text-[10px] font-black text-[#FAF3E1]/40 uppercase tracking-[0.2em] flex items-center gap-3 shadow-sm">
          <ArrowUpDown size={14} className="text-[#FA8112]" />
          Sequence: Balance
        </div>
      </div>

      {/* Data Container */}
      <div className="bg-[#FAF3E1]/[0.02] p-2 rounded-[2.5rem] border border-[#F5E7C6]/10 min-h-[500px]">
        {/* Table component inherits internal theme from its own file */}
        <UserWalletTable wallets={filteredWallets} loading={loading} />
      </div>

      {/* Technical Footer */}
      <div className="text-center">
        <p className="text-[9px] font-black text-[#FAF3E1]/20 uppercase tracking-[0.3em]">
          Centralized Asset Ledger • Node Connection Stable
        </p>
      </div>
    </div>
  );
};

export default UserWallets;
