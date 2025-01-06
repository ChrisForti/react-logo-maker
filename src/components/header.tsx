type HeaderProps = {
  num: number;
};

export function Header(props: HeaderProps) {
  return (
    <div>
      <header className="items flex items-center justify-between bg-slate-700 p-4 text-white">
        <h1 className="text-7xl">Logo maker {props.num}</h1>
        <nav>
          <a className="text-2xl" href="https://github.com/ChrisForti">
            Github
          </a>
        </nav>
      </header>
    </div>
  );
}
