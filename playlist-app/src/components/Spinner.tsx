import { Loader2 } from 'lucide-react';

const Spinner = () => {
  return (
    <span className="flex items-center justify-center">
      <Loader2 className="h-10 w-10 animate-[spin_1s_linear_infinite] text-zinc-600" />
    </span>
  );
};

export default Spinner;
