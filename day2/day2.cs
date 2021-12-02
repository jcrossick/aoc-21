class Day2
{

    public static void solve()
    {
        solve1();
        solve2();

    }

    static void solve1()
    {
        string[] input = read("input1");
        int depth = 0;
        int pos = 0;
        foreach (var line in input)
        {
            string[] dir = line.Split(' ');
            int shift = Int32.Parse(dir[1]);

            switch (dir[0])
            {
                case "forward": // statement sequence
                    pos = pos + shift;
                    break;

                case "down": // statement sequence
                    depth = depth + shift;
                    break;
                case "up": // statement sequence
                    depth = depth - shift;
                    break;

                default:    // default statement sequence
                    throw new Exception("You read the string wrong, Jo! " + line + dir[0] + "?");
            }
        }
        Console.WriteLine("Depth is: " + depth);
        Console.WriteLine("Postion is: " + pos);
        Console.WriteLine("Result is: " + pos * depth);
    }

    static void solve2()
    {
        string[] input = read("input1");
        int depth = 0;
        int pos = 0;
        int aim = 0;
        foreach (var line in input)
        {
            string[] dir = line.Split(' ');
            int shift = Int32.Parse(dir[1]);

            switch (dir[0])
            {
                case "forward": // statement sequence
                    pos = pos + shift;
                    depth = depth + shift*aim;
                    break;

                case "down": // statement sequence
                    aim = aim + shift;
                    break;
                case "up": // statement sequence
                    aim = aim - shift;
                    break;

                default:    // default statement sequence
                    throw new Exception("You read the string wrong, Jo! " + line + dir[0] + "?");
            }
        }
        Console.WriteLine("Depth is: " + depth);
        Console.WriteLine("Postion is: " + pos);
        Console.WriteLine("Result is: " + pos * depth);
    }

    static string[] read(string filename)
    {
        return System.IO.File.ReadAllLines(@"day2/data/" + filename + ".txt");
    }

    static void logOutput(int line)
    {
        Console.WriteLine("Output is: " + line);
    }


}