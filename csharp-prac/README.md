# Getting Started

This README applies specifically to the `csharp-prac` project.

Clone the repo.

```
git clone https://github.com/nduckwiler/prac.git
```

Install the GUI software [Microsoft Visual Studio](https://visualstudio.microsoft.com/) or the command line tool [dotnet SDK](https://dotnet.microsoft.com/learn/dotnet/hello-world-tutorial/intro).


# How to use csharp-prac

```
csharp-prac/
|-- Program.cs
|-- Forest.cs
|-- Dependencies/
    |-- ...
```
`Program.cs` contains the `Main()` method, which is the entry point for the application. When you click "run" for the application, this method is executed.
`Forest.cs` defines the `Forest` class.

## Running with Visual Studio

1. Open the this directory in Visual Studio.
2. Install dependencies/packages if they prompted to do so. 
3. Run the code with Run > Start Without Debugging.

## dotnet SDK

1. Check that you have the `dotnet` CLI (command-line interface). In your terminal, run:
```
dotnet -v
```

You should see the version printed to the console. If you don't, go back to the dotnet SDK link above and follow the instructions.

2. Navigate to this directory and run:
```
dotnet run
```

# Additional Context
There are a number of .NET implementations, like .NET Framework, .NET Core, and Xamarin/Mono. 
This project uses .NET Core because it works across operating systems.

# Sources

- [Classes (C# Programming Guide)](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/classes) by Microsoft
- [What is .NET?](https://dotnet.microsoft.com/learn/dotnet/what-is-dotnet) by Microsoft
