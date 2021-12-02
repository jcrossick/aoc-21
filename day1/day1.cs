using System.Linq;
class Day1
{
    public static void solve()
    {
        Day1.solve1();
        Day1.solve2();
    }

    static void solve1()
    {
        string[] lines = read("input1");
        int[] data = lines.Select(line => Int32.Parse(line)).ToArray();

        int count = 0;
        for (int i = 0; i < data.Length; i++)
        {
            if (i > 0 && data[i] > data[i - 1])
            {
                count++;
            }
        }
        logOutput(count);
    }
    static void solve2()
    {
        string[] lines = read("input1");
        int[] data = lines.Select(line => Int32.Parse(line)).ToArray();

        int[] threeLineSum = data.Select((line, index) =>
        {
            if (index > 1 && index < lines.Length)
            {
                return line + data[index - 1] + data[index - 2];
            }
            return 0;
        }).ToArray();

        int count = 0;
        for (int i = 3; i < threeLineSum.Length; i++)
        {
            if (threeLineSum[i] > threeLineSum[i - 1])
            {
                count++;
            }
        }

        logOutput(count);
    }
    static string[] read(string filename)
    {
        return System.IO.File.ReadAllLines(@"day1/data/" + filename + ".txt");
    }

    static void logOutput(int line)
    {
        Console.WriteLine("Output is: " + line);
    }
}