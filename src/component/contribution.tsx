import { GitHubCalendar } from 'react-github-calendar';

export const Contributions = ({ isDark }: { isDark: boolean }) => {
  return (
    <section id="github" className="mb-24">
      <div className="flex items-center gap-3 mb-8">
        <span className="rounded-none border-2 border-black dark:border-white bg-[#ffe600] px-2 py-1 text-xs font-bold text-black">
          005
        </span>
        <span className="text-xs font-bold uppercase tracking-widest">GitHub_Activity</span>
        <span className="flex-1 h-[2px] bg-black dark:bg-white" />
      </div>

      <div className="rounded-none border-2 border-black dark:border-white bg-white dark:bg-black shadow-[6px_6px_0px_0px_#000] dark:shadow-[6px_6px_0px_0px_#fff]">
        {/* Window chrome title bar */}
        <div className="flex items-center justify-between border-b-2 border-black dark:border-white bg-[#ffe600] px-3 py-1.5">
          <span className="text-xs font-bold uppercase text-black">
            $ git log --author=ashwani1122
          </span>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 border-2 border-black bg-white" />
            <span className="h-3 w-3 border-2 border-black bg-white" />
            <span className="h-3 w-3 border-2 border-black bg-black" />
          </div>
        </div>

        <div className="p-5 overflow-x-auto">
          <GitHubCalendar
            username="ashwani1122"
            blockSize={11}
            blockMargin={3}
            blockRadius={0}
            fontSize={12}
            colorScheme={isDark ? "dark" : "light"}
            theme={{
              light: ['#eeeae0', '#fff7b0', '#ffe600', '#998a00', '#000000'],
              dark: ['#1a1a1a', '#4d4500', '#998a00', '#ffe600', '#ffffff'],
            }}
          />
        </div>
      </div>

      <a
        href="https://github.com/ashwani1122"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 rounded-none border-2 border-black dark:border-white bg-white dark:bg-black px-4 py-2 text-xs font-bold uppercase shadow-[3px_3px_0px_0px_#000] dark:shadow-[3px_3px_0px_0px_#fff] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
      >
        View_Full_Profile →
      </a>
    </section>
  );
};
