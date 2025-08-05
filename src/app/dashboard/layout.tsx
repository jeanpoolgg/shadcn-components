"use client"

import { 
  Menu, 
  Sun, 
  Moon, 
  Home, 
  BarChart3, 
  Users, 
  Settings, 
  FileText, 
  ShoppingCart, 
  CreditCard, 
  Package,
  UserPlus,
  UserCheck,
  Shield,
  Bell,
  Mail,
  Calendar,
  TrendingUp,
  PieChart,
  Activity,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';

interface SubItem {
  id: string;
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

interface SidebarItem {
  id: string;
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  subItems: SubItem[];
}

const sidebarItems: SidebarItem[] = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: Home,
    subItems: [
      { id: 'overview', name: 'Overview', icon: BarChart3 },
      { id: 'analytics', name: 'Analytics', icon: TrendingUp },
      { id: 'reports', name: 'Reports', icon: PieChart },
      { id: 'metrics', name: 'Metrics', icon: Activity }
    ]
  },
  {
    id: 'users',
    name: 'Users',
    icon: Users,
    subItems: [
      { id: 'all-users', name: 'All Users', icon: Users },
      { id: 'add-user', name: 'Add User', icon: UserPlus },
      { id: 'user-roles', name: 'User Roles', icon: UserCheck },
      { id: 'permissions', name: 'Permissions', icon: Shield }
    ]
  },
  {
    id: 'products',
    name: 'Products',
    icon: Package,
    subItems: [
      { id: 'inventory', name: 'Inventory', icon: Package },
      { id: 'orders', name: 'Orders', icon: ShoppingCart },
      { id: 'payments', name: 'Payments', icon: CreditCard },
      { id: 'shipping', name: 'Shipping', icon: FileText }
    ]
  },
  {
    id: 'communications',
    name: 'Communications',
    icon: Mail,
    subItems: [
      { id: 'messages', name: 'Messages', icon: Mail },
      { id: 'notifications', name: 'Notifications', icon: Bell },
      { id: 'calendar', name: 'Calendar', icon: Calendar },
      { id: 'announcements', name: 'Announcements', icon: FileText }
    ]
  },
  {
    id: 'settings',
    name: 'Settings',
    icon: Settings,
    subItems: [
      { id: 'general', name: 'General', icon: Settings },
      { id: 'security', name: 'Security', icon: Shield },
      { id: 'integrations', name: 'Integrations', icon: Package },
      { id: 'billing', name: 'Billing', icon: CreditCard }
    ]
  }
];

export default function Layout() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('overview');
  const [expandedItems, setExpandedItems] = useState<string[]>(['dashboard']);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
    if (!isSidebarCollapsed) {
      setExpandedItems([]);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleItemExpansion = (itemId: string) => {
    if (isSidebarCollapsed) return;
    
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSubItemClick = (subItemId: string) => {
    setActiveItem(subItemId);
    setIsMobileMenuOpen(false);
  };

  const getActiveItemName = () => {
    for (const item of sidebarItems) {
      const subItem = item.subItems.find(sub => sub.id === activeItem);
      if (subItem) return subItem.name;
    }
    return 'Dashboard';
  };

  const themeClasses = isDarkMode ? 'dark' : '';

  return (
    <div className={`${themeClasses} min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300`}>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className={`
          ${isSidebarCollapsed ? 'w-16' : 'w-64'} 
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          fixed lg:relative inset-y-0 left-0 z-50 
          bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
          transition-all duration-300 ease-in-out
          flex flex-col
        `}>
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            {!isSidebarCollapsed && (
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
            )}
            <button
              onClick={toggleSidebar}
              className="hidden lg:block p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {isSidebarCollapsed ? <ChevronRight size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 
            scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 
            scrollbar-track-gray-100 dark:scrollbar-track-gray-800
            hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-500">
            <ul className="space-y-2 px-3">
              {sidebarItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => toggleItemExpansion(item.id)}
                    className={`
                      w-full flex items-center justify-between p-3 rounded-lg text-left
                      text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white 
                      hover:bg-gray-200 dark:hover:bg-gray-700
                      transition-colors duration-200
                      ${expandedItems.includes(item.id) ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white' : ''}
                    `}
                    title={isSidebarCollapsed ? item.name : undefined}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon size={20} className="flex-shrink-0" />
                      {!isSidebarCollapsed && (
                        <span className="font-medium">{item.name}</span>
                      )}
                    </div>
                    {!isSidebarCollapsed && (
                      <ChevronDown 
                        size={16} 
                        className={`transform transition-transform ${
                          expandedItems.includes(item.id) ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </button>

                  {/* Subitems */}
                  {expandedItems.includes(item.id) && !isSidebarCollapsed && (
                    <ul className="mt-2 space-y-1 pl-6">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.id}>
                          <button
                            onClick={() => handleSubItemClick(subItem.id)}
                            className={`
                              w-full flex items-center space-x-3 p-2 rounded-lg text-left
                              transition-colors duration-200
                              ${activeItem === subItem.id 
                                ? 'bg-black dark:bg-white text-white dark:text-black' 
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                              }
                            `}
                          >
                            <subItem.icon size={16} className="flex-shrink-0" />
                            <span className="text-sm">{subItem.name}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Collapsed subitems indicators */}
                  {isSidebarCollapsed && (
                    <div className="ml-6 mt-1">
                      {item.subItems.map((subItem) => (
                        <button
                          key={subItem.id}
                          onClick={() => handleSubItemClick(subItem.id)}
                          className={`
                            block w-2 h-2 rounded-full mb-1
                            ${activeItem === subItem.id 
                              ? 'bg-black dark:bg-white' 
                              : 'bg-gray-400 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-400'
                            }
                          `}
                          title={subItem.name}
                        />
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={toggleMobileMenu}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-gray-100 dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleMobileMenu}
                  className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <Menu size={20} />
                </button>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {getActiveItemName()}
                </h2>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-6 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto">
              {/* Main Content Card */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 min-h-[600px]">
                <div className="p-8">
                  <div className="flex items-center justify-center h-full min-h-[500px]">
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto mb-6 bg-black dark:bg-white rounded-full flex items-center justify-center">
                        {sidebarItems.map(item => 
                          item.subItems.find(sub => sub.id === activeItem)
                        ).filter(Boolean).map(subItem => 
                          subItem && <subItem.icon key={subItem.id} size={32} className="text-white dark:text-black" />
                        )}
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        {getActiveItemName()}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-lg max-w-md mx-auto">
                        Esta página está lista para tu contenido. Aquí puedes agregar todos los componentes y funcionalidades específicas de {getActiveItemName().toLowerCase()}.
                      </p>
                      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                        <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
                          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center mb-3">
                            <BarChart3 size={16} className="text-gray-700 dark:text-gray-300" />
                          </div>
                          <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Responsive</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Optimizado para todos los dispositivos</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
                          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center mb-3">
                            <Moon size={16} className="text-gray-700 dark:text-gray-300" />
                          </div>
                          <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Modo Oscuro</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Tema claro y oscuro disponible</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
                          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center mb-3">
                            <Settings size={16} className="text-gray-700 dark:text-gray-300" />
                          </div>
                          <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Personalizable</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Fácil de modificar y extender</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}