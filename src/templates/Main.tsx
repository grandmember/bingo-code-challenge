import type { ReactNode } from 'react';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="h-full max-h-screen w-full text-gray-700 antialiased">
    {props.meta}

    <div className="mx-auto">
      <main className="content">{props.children}</main>
    </div>
  </div>
);

export { Main };
