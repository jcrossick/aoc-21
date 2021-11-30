class Day0
{
    public static void solve()
    {
        string[] lines = read("example");
        logOutput(lines);
    }
    static string[] read(string filename)
    {
        return System.IO.File.ReadAllLines(@"day0/data/" + filename + ".txt");
    }

    static void logOutput(string[] lines)
    {
        foreach (string line in lines)
        {
            // Use a tab to indent each line of the file.
            Console.WriteLine("\t" + line);
        }
    }
}