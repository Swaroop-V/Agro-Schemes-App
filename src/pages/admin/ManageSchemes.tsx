import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

interface Scheme {
  id: string;
  title: string;
  provider: string;
  eligibility: string;
  benefits: string;
  deadline: string;
}

export const ManageSchemes: React.FC = () => {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    provider: '',
    eligibility: '',
    benefits: '',
    deadline: ''
  });

  const fetchSchemes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'schemes'));
      const schemesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Scheme[];
      setSchemes(schemesData);
    } catch (error) {
      console.error("Error fetching schemes:", error);
      toast.error("Failed to load schemes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchemes();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, 'schemes', editingId), formData);
        toast.success("Scheme updated successfully");
      } else {
        await addDoc(collection(db, 'schemes'), formData);
        toast.success("Scheme added successfully");
      }
      setIsModalOpen(false);
      setFormData({ title: '', provider: '', eligibility: '', benefits: '', deadline: '' });
      setEditingId(null);
      fetchSchemes();
    } catch (error) {
      console.error("Error saving scheme:", error);
      toast.error("Failed to save scheme");
    }
  };

  const handleEdit = (scheme: Scheme) => {
    setFormData({
      title: scheme.title,
      provider: scheme.provider,
      eligibility: scheme.eligibility,
      benefits: scheme.benefits,
      deadline: scheme.deadline
    });
    setEditingId(scheme.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this scheme?")) {
      try {
        await deleteDoc(doc(db, 'schemes', id));
        toast.success("Scheme deleted successfully");
        fetchSchemes();
      } catch (error) {
        console.error("Error deleting scheme:", error);
        toast.error("Failed to delete scheme");
      }
    }
  };

  const openNewModal = () => {
    setFormData({ title: '', provider: '', eligibility: '', benefits: '', deadline: '' });
    setEditingId(null);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Govt Schemes</h1>
        <button
          onClick={openNewModal}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Scheme
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading schemes...</div>
      ) : (
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scheme Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {schemes.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-500">No schemes found. Add one to get started.</td>
                </tr>
              ) : (
                schemes.map((scheme) => (
                  <tr key={scheme.id}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{scheme.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{scheme.provider}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{scheme.deadline}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button onClick={() => handleEdit(scheme)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(scheme.id)} className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">{editingId ? 'Edit Scheme' : 'Add New Scheme'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Scheme Title</label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Provider (e.g., State/Central Govt)</label>
                  <input
                    type="text"
                    name="provider"
                    required
                    value={formData.provider}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Application Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  required
                  value={formData.deadline}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Eligibility Criteria</label>
                <textarea
                  name="eligibility"
                  required
                  rows={3}
                  value={formData.eligibility}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Benefits / Financial Aid</label>
                <textarea
                  name="benefits"
                  required
                  rows={4}
                  value={formData.benefits}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                ></textarea>
              </div>
              <div className="flex justify-end pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 mr-3"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-purple-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  {editingId ? 'Update Scheme' : 'Save Scheme'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
