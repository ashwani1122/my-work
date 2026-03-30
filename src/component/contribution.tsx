import { GitHubCalendar } from 'react-github-calendar';

export const Contributions = () => {
  return (
    <div className=" flex justify-center flex-col items-center py-10">
      <h3 className="text-white mb-4 font-medium">GitHub Activity</h3>
      <GitHubCalendar 
        username="ashwani1122"
        blockSize={12}
        blockMargin={4}
        fontSize={14}
        theme={{
          light: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
          dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
        }}
      />
    </div>
  );
};