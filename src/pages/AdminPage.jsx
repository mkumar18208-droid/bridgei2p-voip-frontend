import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import { 
  ArrowLeft, RefreshCw, Search, Download, Phone, Mail, 
  Globe, Calendar, MessageSquare, CheckCircle, XCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

/* ===== BACKEND FIX (IMPORTANT) ===== */
const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL ||
  "https://bridgei2p-voip-backend.onrender.com";

const API = `${BACKEND_URL}/api`;
/* =================================== */

const AdminPage = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLead, setSelectedLead] = useState(null);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      console.log("API URL:", API);
      const response = await axios.get(`${API}/leads`);
      setLeads(response.data);
    } catch (error) {
      toast.error('Failed to fetch leads');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const filteredLeads = leads.filter(lead => {
    const search = searchTerm.toLowerCase();
    return (
      lead.first_name?.toLowerCase().includes(search) ||
      lead.last_name?.toLowerCase().includes(search) ||
      lead.company_name?.toLowerCase().includes(search) ||
      lead.work_email?.toLowerCase().includes(search) ||
      lead.phone_number?.includes(search)
    );
  });

  const exportToCSV = () => {
    const headers = ['First Name', 'Last Name', 'Company', 'Website', 'Email', 'Phone', 'Query', 'Opt-in', 'Date'];

    const csvData = filteredLeads.map(lead => [
      lead.first_name,
      lead.last_name,
      lead.company_name,
      lead.website,
      lead.work_email,
      lead.phone_number,
      lead.query?.replace(/,/g, ';'),
      lead.opt_in ? 'Yes' : 'No',
      new Date(lead.created_at).toLocaleDateString()
    ]);

    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `bridgei2p-leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();

    window.URL.revokeObjectURL(url);
    toast.success('Leads exported to CSV');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">

      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <div className="flex items-center gap-4">
            <a href="/" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft size={20} />
            </a>

            <h1 className="text-xl font-bold text-gray-900">
              Leads Dashboard
            </h1>

            <span className="bg-[#F98E29] text-black text-xs font-bold px-2 py-1 rounded-full">
              {filteredLeads.length} Leads
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={fetchLeads}
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              Refresh
            </Button>

            <Button
              onClick={exportToCSV}
              className="bg-[#F98E29] hover:bg-[#e07a1f] text-black font-semibold"
            >
              <Download size={16} />
              Export CSV
            </Button>
          </div>

        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* SEARCH */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <Input
              type="text"
              placeholder="Search by name, company, email or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[#0F0F0F] border-white/10 text-white"
            />
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">

          <div className="bg-[#0F0F0F] border border-white/10 rounded-xl p-4">
            <div className="text-zinc-500 text-sm">Total Leads</div>
            <div className="text-2xl font-bold">{leads.length}</div>
          </div>

          <div className="bg-[#0F0F0F] border border-white/10 rounded-xl p-4">
            <div className="text-zinc-500 text-sm">Opted In</div>
            <div className="text-2xl font-bold text-green-500">
              {leads.filter(l => l.opt_in).length}
            </div>
          </div>

          <div className="bg-[#0F0F0F] border border-white/10 rounded-xl p-4">
            <div className="text-zinc-500 text-sm">Email Verified</div>
            <div className="text-2xl font-bold text-blue-500">
              {leads.filter(l => l.email_verified).length}
            </div>
          </div>

          <div className="bg-[#0F0F0F] border border-white/10 rounded-xl p-4">
            <div className="text-zinc-500 text-sm">Today's Leads</div>
            <div className="text-2xl font-bold text-[#F98E29]">
              {leads.filter(l =>
                new Date(l.created_at).toDateString() === new Date().toDateString()
              ).length}
            </div>
          </div>

        </div>

        {/* TABLE */}
        <div className="bg-[#0F0F0F] border border-white/10 rounded-xl overflow-hidden">

          {loading ? (
            <div className="p-12 text-center">
              <RefreshCw className="animate-spin mx-auto mb-4 text-[#F98E29]" size={32} />
              <p className="text-zinc-500">Loading leads...</p>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-zinc-500">No leads found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs text-zinc-400">#</th>
                    <th className="px-4 py-3 text-left text-xs text-zinc-400">Name</th>
                    <th className="px-4 py-3 text-left text-xs text-zinc-400">Company</th>
                    <th className="px-4 py-3 text-left text-xs text-zinc-400">Contact</th>
                    <th className="px-4 py-3 text-left text-xs text-zinc-400">Status</th>
                    <th className="px-4 py-3 text-left text-xs text-zinc-400">Date</th>
                    <th className="px-4 py-3 text-left text-xs text-zinc-400">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/5">
                  {filteredLeads.map((lead, index) => (
                    <tr key={lead.id} className="hover:bg-white/5">

                      <td className="px-4 py-4 text-zinc-500">{index + 1}</td>

                      <td className="px-4 py-4">
                        {lead.first_name} {lead.last_name}
                      </td>

                      <td className="px-4 py-4 text-zinc-300">
                        {lead.company_name}
                      </td>

                      <td className="px-4 py-4 text-zinc-300">
                        {lead.work_email}
                      </td>

                      <td className="px-4 py-4">
                        {lead.email_verified ? (
                          <span className="text-green-500 text-xs">Verified</span>
                        ) : (
                          <span className="text-red-500 text-xs">Unverified</span>
                        )}
                      </td>

                      <td className="px-4 py-4 text-zinc-400">
                        {formatDate(lead.created_at)}
                      </td>

                      <td className="px-4 py-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedLead(lead)}
                          className="border-white/10 text-zinc-300 hover:bg-white/10 text-xs"
                        >
                          View
                        </Button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>

      {/* MODAL */}
      {selectedLead && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedLead(null)}
        >
          <div
            className="bg-[#0F0F0F] border border-white/10 rounded-2xl max-w-lg w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >

            <h2 className="text-xl font-bold mb-4">Lead Details</h2>

            <p className="text-zinc-300">
              {selectedLead.first_name} {selectedLead.last_name}
            </p>

            <p className="text-zinc-500">{selectedLead.company_name}</p>

          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
