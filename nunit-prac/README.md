# Foreword

NUnit documentation is not easy to navigate nor discover. Hopefully, this project helps.

## Attributes
All attributes are [described in the docs](https://github.com/nunit/docs/wiki/Attributes). We've included a few to start with:

### TestFixture
The `ForestTest` class is labeled with the attribute: `[TextFixture]`. This tells NUnit: "This class contains tests and maybe setup and teardown methods".

### Test and ExpectedResult
The methods within the `[TestFixture]` class are labeled `[Test]`. These methods can return a value or return nothing (void). 
* If a `[Test]` returns nothing, then we typically make an assertion within the `[Test]`. The assertion is just a method call that raises an error if its assertion is not true:
```cs
[Test]
public void TestAdd()
{
    Assert.That(2 + 2, Is.Equal.To(4));
}
```
* If a `[Test]` returns a value, then we need to add an `ExpectedResult` parameter:
```cs
[Test(ExpectedResult = 4)]
public int TestAdd()
{
    return 2 + 2;
}
```

## Assertions
The general idea of assertions is [best explained in the docs](https://github.com/nunit/docs/wiki/Assertions). The hard part is finding the right assertion for your purposes. Look in `ForestTest.cs` for some common ones.


# Getting Started

This README applies specifically to the `nunit-prac` project.

Clone the repo.
```
git clone https://github.com/nduckwiler/prac.git
```

Install the [dotnet SDK](https://dotnet.microsoft.com/learn/dotnet/hello-world-tutorial/intro).

(Recommended, not required) Install [Visual Studio Code (VS Code)](https://code.visualstudio.com/download).

(Recommended, not required) Install [Visual Studio](https://visualstudio.microsoft.com/).

# How to use nunit-prac
```
nunit-prac/
|-- Forest.cs
|-- ForestTest.cs
|-- ...
```

`Forest.cs` contains the definition for the `Forest` class.

`ForestTest.cs` contains the unit tests for the `Forest` class.

## Running with dotnet SDK
1. Check that you have the `dotnet` CLI (command-line interface). In your terminal, run:
```
dotnet -v
```

You should see the version printed to the console. If you don't, go back to the dotnet SDK link above and follow the instructions.

2. Navigate to this directory and run:
```
dotnet test
```

## Running with Visual Studio

1. Open the this directory in Visual Studio.
2. Install dependencies/packages if they prompted to do so. 
3. Run the code with Run > Run Unit Tests.

# Sources
- [NUnit documentation](https://github.com/nunit/docs/wiki/NUnit-Documentation)