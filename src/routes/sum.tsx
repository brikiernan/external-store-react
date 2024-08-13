import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useEffect } from 'react';

export const Route = createFileRoute('/sum')({
  loader: async ({ params }) => console.log('params', params),
  component: Sum,
});

function Sum() {
  const router = useRouter();

  useEffect(() => {
    console.log('sum');
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        const matches = await router.preloadRoute({
          to: '/',
          params: { id: 1 },
        });

        console.log('pre sum');

        console.log(matches);
      } catch (err) {
        // Failed to preload route
      }
    };

    init();
  }, [router]);

  return <div>Hello /sum!</div>;
}
