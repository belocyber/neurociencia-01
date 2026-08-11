import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
}

export function StatCard({ title, value, subtitle, icon: Icon }: StatCardProps) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col justify-between hover:bg-zinc-800/50 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-zinc-400 font-medium text-sm">{title}</h3>
        <div className="p-2 bg-zinc-800/50 rounded-lg">
          <Icon className="w-5 h-5 text-indigo-400" />
        </div>
      </div>
      <div>
        <p className="text-3xl font-bold text-zinc-100">{value}</p>
        <p className="text-xs text-zinc-500 mt-1 font-medium">{subtitle}</p>
      </div>
    </div>
  );
}
