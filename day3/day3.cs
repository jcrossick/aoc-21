using System.Diagnostics;
class Day3
{
    public static void solve()
    {
        Diagnostics test1 = new Diagnostics("test1");
        Trace.Assert(test1.gammaRate.Equals(22), "Gamma rate was wrong, expected 22 but got " + test1.gammaRate);
        Trace.Assert(test1.epsilonRate.Equals(9), "Epsilon rate was wrong, expected 9 but got " + test1.epsilonRate);
        Trace.Assert(test1.powerConsumption.Equals(198), "Power consumption was wrong, expected 198 but got " + test1.powerConsumption);

        Diagnostics part1 = new Diagnostics("part1");
        logOutput(part1.powerConsumption);
    }

    class Diagnostics
    {
        private string[] input;
        public int[] digitCount { get; private set; }
        public Diagnostics(string filename)
        {
            input = read(filename);
            if (input.Length < 1)
            {
                throw new System.Exception("Read the file but returned array was zero");
            }
            digitCount = new int[input[0].Length];

            foreach (string line in input)
            {
                char[] digits = line.ToCharArray();
                for (int i = 0; i < line.Length; i++)
                {
                    if (digits[i].Equals('1'))
                    {
                        digitCount[i]++;
                    }
                    else if (!digits[i].Equals('0'))
                    {
                        throw new System.Exception("Expected to get 0 or 1 in the array but got " + digits[i]);
                    }
                }
            }

            string gammaRateStr = "";
            string epsilonRateStr = "";
            foreach (int num in digitCount)
            {
                if (num > input.Length / 2)
                {
                    gammaRateStr = gammaRateStr + "1";
                    epsilonRateStr = epsilonRateStr + "0";
                }
                else
                {
                    gammaRateStr = gammaRateStr + "0";
                    epsilonRateStr = epsilonRateStr + "1";
                }
            }
            gammaRate = Convert.ToInt32(gammaRateStr, 2);
            epsilonRate = Convert.ToInt32(epsilonRateStr, 2);
        }

        public int gammaRate { get; private set; }
        public int epsilonRate { get; private set; }

        public int powerConsumption
        {
            get
            {
                return epsilonRate * gammaRate;
            }
        }
    }

    static string[] read(string filename)
    {
        return System.IO.File.ReadAllLines(@"day3/data/" + filename + ".txt");
    }

    static void logOutput(int line)
    {
        Console.WriteLine("Output is: " + line);
    }


}