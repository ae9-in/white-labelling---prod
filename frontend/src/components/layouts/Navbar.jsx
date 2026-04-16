const Navbar = () => {
  return (
    <div className="bg-beige-100 border-b border-beige-200 px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Operations Hub</p>
          <h2 className="text-2xl font-bold text-gray-800">Wholesale Business Management</h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-xs text-gray-500">Operator mode</p>
            <p className="text-sm font-semibold text-gray-800">System Operator</p>
            <p className="text-xs text-gray-600">ADMIN</p>
          </div>
          <div className="w-12 h-12 bg-teal-700 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
            SO
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
