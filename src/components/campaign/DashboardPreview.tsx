'use client';

import { motion } from 'framer-motion';
import { 
  Search, Bell, ChevronDown, Home, ListTodo, ArrowLeftRight, 
  CreditCard, Wallet, Landmark, Plus, MoreVertical, CheckCircle2 
} from 'lucide-react';

export default function DashboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="mt-8 w-full max-w-5xl px-4 md:px-0"
    >
      <div 
        className="rounded-2xl overflow-hidden p-3 md:p-4 clip-dashboard"
        style={{
          background: 'rgba(255, 255, 255, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          boxShadow: 'var(--shadow-dashboard)'
        }}
      >
        <div className="flex bg-background rounded-xl overflow-hidden h-[500px] text-[11px] select-none pointer-events-none">
          {/* Sidebar */}
          <aside className="w-40 border-r border-border p-4 flex flex-col gap-6">
            <div className="flex items-center gap-2 px-2">
              <div className="w-5 h-5 bg-primary rounded-md flex items-center justify-center text-primary-foreground font-bold">N</div>
              <span className="font-semibold text-foreground">Nexora</span>
              <ChevronDown size={12} className="text-muted-foreground ml-auto" />
            </div>

            <div className="flex flex-col gap-1">
              <SidebarItem icon={Home} label="Home" active />
              <SidebarItem icon={ListTodo} label="Tasks" badge="10" />
              <SidebarItem icon={ArrowLeftRight} label="Transactions" />
              <SidebarItem icon={Wallet} label="Payments" hasChevron />
              <SidebarItem icon={CreditCard} label="Cards" />
              <SidebarItem icon={Landmark} label="Capital" />
              <SidebarItem icon={CheckCircle2} label="Accounts" hasChevron />
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[9px] uppercase tracking-wider text-muted-foreground px-2 mb-2">Workflows</span>
              <span className="px-2 py-1.5 text-muted-foreground">Trade routes</span>
              <span className="px-2 py-1.5 text-muted-foreground">Payments</span>
              <span className="px-2 py-1.5 text-muted-foreground">Notifications</span>
              <span className="px-2 py-1.5 text-muted-foreground">Settings</span>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 flex flex-col bg-secondary/30">
            {/* Top Bar */}
            <header className="h-12 border-b border-border bg-background px-6 flex items-center justify-between">
              <div className="flex items-center gap-3 bg-secondary/50 px-3 py-1.5 rounded-md border border-border w-64">
                <Search size={14} className="text-muted-foreground" />
                <span className="text-muted-foreground">Search payments, users...</span>
                <span className="ml-auto text-[9px] text-muted-foreground bg-background border border-border px-1 rounded">⌘K</span>
              </div>
              <div className="flex items-center gap-4">
                <button className="bg-primary text-primary-foreground px-3 py-1.5 rounded-full font-medium">Move Money</button>
                <Bell size={14} className="text-muted-foreground" />
                <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-semibold">JB</div>
              </div>
            </header>

            <div className="p-6 flex flex-col gap-6">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Welcome, Jane</h3>
                <div className="flex items-center gap-2 mt-3">
                  <ActionButton label="Send" accent />
                  <ActionButton label="Request" />
                  <ActionButton label="Transfer" />
                  <ActionButton label="Deposit" />
                  <ActionButton label="Pay Bill" />
                  <ActionButton label="Create Invoice" />
                  <span className="text-muted-foreground ml-2">Customize</span>
                </div>
              </div>

              {/* Cards Grid */}
              <div className="flex gap-4">
                <div className="flex-1 basis-0 bg-background border border-border rounded-xl p-5 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground font-medium">Mercury Balance</span>
                      <CheckCircle2 size={12} className="text-accent" />
                    </div>
                  </div>
                  <div className="text-2xl font-semibold tracking-tight">
                    $8,450,190<span className="text-xs text-muted-foreground">.32</span>
                  </div>
                  <div className="flex gap-4 mt-2 mb-4">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-muted-foreground uppercase">Last 30 Days</span>
                      <span className="text-green-500">+$1.8M</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] text-muted-foreground uppercase">Spent</span>
                      <span className="text-red-500">-$900K</span>
                    </div>
                  </div>
                  <div className="h-20 w-full relative">
                    <svg className="w-full h-full overflow-visible">
                      <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.15" />
                          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0,80 C20,70 40,30 60,40 C80,50 100,10 120,20 C140,30 160,50 180,45 C200,40 220,10 240,15 C260,20 280,40 300,35"
                        fill="none"
                        stroke="hsl(var(--accent))"
                        strokeWidth="1.5"
                        className="w-full"
                      />
                      <path
                        d="M0,80 C20,70 40,30 60,40 C80,50 100,10 120,20 C140,30 160,50 180,45 C200,40 220,10 240,15 C260,20 280,40 300,35 V80 H0 Z"
                        fill="url(#chartGradient)"
                      />
                    </svg>
                  </div>
                </div>

                <div className="flex-1 basis-0 bg-background border border-border rounded-xl p-5 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-muted-foreground font-medium">Accounts</span>
                    <div className="flex gap-2">
                      <Plus size={14} className="text-muted-foreground" />
                      <MoreVertical size={14} className="text-muted-foreground" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <AccountRow label="Credit" amount="$98,125.50" />
                    <AccountRow label="Treasury" amount="$6,750,200.00" />
                    <AccountRow label="Operations" amount="$1,592,864.82" />
                  </div>
                </div>
              </div>

              {/* Transactions Table */}
              <div className="bg-background border border-border rounded-xl p-5 shadow-sm">
                <h4 className="font-semibold mb-4">Recent Transactions</h4>
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-muted-foreground border-b border-border">
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium">Description</th>
                      <th className="pb-3 font-medium">Amount</th>
                      <th className="pb-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <TransactionRow date="Oct 24" desc="AWS Cloud Services" amount="-$5,200.00" status="Pending" statusColor="amber" />
                    <TransactionRow date="Oct 23" desc="Client Payment - Acme Corp" amount="+$125,000.00" status="Completed" statusColor="green" />
                    <TransactionRow date="Oct 22" desc="Payroll - Q4" amount="-$85,450.00" status="Completed" statusColor="green" />
                    <TransactionRow date="Oct 21" desc="Office Supplies" amount="-$1,200.00" status="Completed" statusColor="green" />
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </motion.div>
  );
}

function SidebarItem({ icon: Icon, label, active, badge, hasChevron }: any) {
  return (
    <div className={`flex items-center gap-2 px-2 py-1.5 rounded-md transition-colors ${active ? 'bg-secondary text-foreground font-medium' : 'text-muted-foreground hover:bg-secondary/50'}`}>
      <Icon size={14} />
      <span>{label}</span>
      {badge && <span className="ml-auto bg-accent/10 text-accent px-1.5 py-0.5 rounded-full text-[8px]">{badge}</span>}
      {hasChevron && <ChevronDown size={10} className="ml-auto" />}
    </div>
  );
}

function ActionButton({ label, accent }: any) {
  return (
    <button className={`px-3 py-1 rounded-full border border-border text-[10px] font-medium transition-colors ${accent ? 'bg-accent text-accent-foreground border-accent' : 'bg-background text-foreground hover:bg-secondary'}`}>
      {label}
    </button>
  );
}

function AccountRow({ label, amount }: any) {
  return (
    <div className="flex justify-between items-center text-xs">
      <span className="text-foreground">{label}</span>
      <span className="font-medium text-foreground">{amount}</span>
    </div>
  );
}

function TransactionRow({ date, desc, amount, status, statusColor }: any) {
  return (
    <tr className="border-b border-border/50 last:border-0">
      <td className="py-3 text-muted-foreground">{date}</td>
      <td className="py-3 font-medium text-foreground">{desc}</td>
      <td className="py-3 font-medium text-foreground">{amount}</td>
      <td className="py-3">
        <span className={`px-2 py-0.5 rounded-full text-[9px] font-medium bg-${statusColor}-500/10 text-${statusColor}-600`}>
          {status}
        </span>
      </td>
    </tr>
  );
}
