import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface PlaylistFormProps {
  onCreate: (name: string) => void;
}

export default function PlaylistForm({ onCreate }: PlaylistFormProps) {
  const [name, setName] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!name.trim()) return;
        onCreate(name.trim());
        setName('');
      }}
    >
      <div className="flex gap-2">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nova playlist"
          className="flex-1 text-white selection:bg-[#FF4081]/95 selection:text-white"
        />
        <Button
          type="submit"
          className="cursor-pointer bg-green-600 hover:bg-green-700"
        >
          <Plus />
          Criar
        </Button>
      </div>
    </form>
  );
}
