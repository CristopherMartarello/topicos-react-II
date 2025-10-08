import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../store/store';
import {
  addPlaylist,
  removePlaylist,
  updatePlaylist,
} from '../store/slices/playlistsSlice';
import PlaylistForm from '../components/PlaylistForm';
import { Pencil, Plus, Trash } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { AlertDialogCancel } from '@radix-ui/react-alert-dialog';

export default function Playlists() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const playlists = useSelector((s: RootState) => s.playlists.items);
  const auth = useSelector((s: RootState) => s.auth.user);

  if (!auth) return <div>Usuário não encontrado</div>;

  const my = playlists.filter((p) => p.userId === auth.id);

  return (
    <div className="mt-20 bg-zinc-900 p-10">
      <h1 className="mb-4 text-2xl font-bold text-white">Minhas Playlists</h1>
      <PlaylistForm
        onCreate={(name: string) =>
          dispatch(addPlaylist({ name, userId: auth.id }))
        }
      />

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {my.map((pl) => (
          <Card
            key={pl.id}
            className="cursor-pointer border-none bg-zinc-800 px-1 py-4 transition hover:border-[#FF4081]/95 hover:bg-[#FF4081]/10 hover:shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/playlists/${pl.id}`);
            }}
          >
            <CardHeader
              className="flex flex-row items-center justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <CardTitle className="text-lg text-white">{pl.name}</CardTitle>
              <div className="flex gap-2">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="cursor-pointer text-blue-400 hover:bg-blue-200 hover:text-blue-700"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Pencil className="h-5 w-5" />
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent className="bg-zinc-900 text-white">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Editar Playlist</AlertDialogTitle>
                    </AlertDialogHeader>

                    <div className="mt-4 flex flex-col gap-4">
                      <Input
                        onClick={(e) => e.stopPropagation()}
                        defaultValue={pl.name}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            const target = e.target as HTMLInputElement;
                            dispatch(
                              updatePlaylist({ id: pl.id, name: target.value })
                            );
                          }
                        }}
                        className="flex-1 text-white selection:bg-[#FF4081]/95 selection:text-white"
                      />
                      <div className="flex justify-end gap-2">
                        <AlertDialogCancel
                          onClick={(e) => e.stopPropagation()}
                          className="cursor-pointer"
                        >
                          Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={(e) => {
                            e.stopPropagation();
                            const input = e.currentTarget.parentElement
                              ?.previousElementSibling as HTMLInputElement;
                            if (input) {
                              dispatch(
                                updatePlaylist({ id: pl.id, name: input.value })
                              );
                            }
                          }}
                          className="cursor-pointer bg-[#FF4081]/95 hover:bg-[#FF4081]/50"
                        >
                          Salvar
                        </AlertDialogAction>
                      </div>
                    </div>
                  </AlertDialogContent>
                </AlertDialog>

                <Button
                  variant="ghost"
                  size="icon"
                  className="cursor-pointer text-red-500 hover:bg-red-200 hover:text-red-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(removePlaylist(pl.id));
                  }}
                >
                  <Trash className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-1">
                {pl.musics.slice(0, 4).map((m) => (
                  <img
                    src={m.strTrackThumb || ''}
                    alt={m.strTrack}
                    className="h-10 w-10 rounded object-cover"
                  />
                ))}

                {pl.musics.length > 4 && (
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-zinc-400">
                    <Plus className="h-5 w-5" />
                  </div>
                )}
              </div>
              {pl.musics.length === 0 && (
                <span className="text-sm text-white">
                  Ainda não existem músicas nessa playlist, adicione!
                </span>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
