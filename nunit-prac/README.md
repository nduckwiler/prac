# Foreword

NUnit documentation is not easy to navigate nor discover. Hopefully, this project helps.

Here's a basic NUnit test setup:
```cs
using NUnit.Framework;
using Forestry;

namespace Tests
{
    [TestFixture]
    public class ForestTest
    {
        private Forest f;

        [Test]
        public void Constructor_Sets_Biome_Property()
        {
            string expectedBiome = "Tropical";

            f = new Forest("Amazon", expectedBiome);

            Assert.That(f.Biome, Is.EqualTo(expectedBiome), "Expected Forest constructor to set Biome property.");
        }
    }
}
```

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
The general idea of assertions is [best explained in the docs](https://github.com/nunit/docs/wiki/Assertions). 

In this project we generally use `Assert.That()` with the below three formats. The `message` argument is optional but recommended.

```cs
Assert.That(bool condition, string message);
Assert.That<TActual>(TActual actual, IResolveConstraint constraint, string message)
Assert.That(TestDelegate code, IResolveConstraint constraint, string message, 
```

Here's an example of each:

```cs
Assert.That(2 + 2 == 4, "Expected math to work like the real world.")
Assert.That(f.Biome, Is.EqualTo(expectedBiome), $"Expected Biome property to default to {expectedBiome}.");
Assert.That(() => { throw new ArgumentException(); }, Throws.ArgumentException, "Expected ArgumentException constructor to throw an ArgumentException.");
```

## Constraints
Usually the hard part is finding the right constraint for your purposes. Some common ones are found below. You can find more examples in `ForestTest.cs` and the [full list of constraints online](https://github.com/nunit/docs/wiki/Constraints).

### [EqualConstraint](https://github.com/nunit/docs/wiki/EqualConstraint)
Check if one thing equals another.
```cs
Assert.That(2+2, Is.EqualTo(4));
Assert.That("Hello!", Is.EqualTo("HELLO!").IgnoreCase);
Assert.That(2.1 + 1.2, Is.EqualTo(3.3).Within(.0005));
```

### [CollectionContainsConstraint](https://github.com/nunit/docs/wiki/CollectionContainsConstraint)
Check if a collection has a certain object.
```cs
int[] iarray = new int[] { 1, 2, 3 };
Assert.That(iarray, Has.Member(3));
Assert.That(iarray, Has.No.Member(5));
```

### [NullConstraint](https://github.com/nunit/docs/wiki/NullConstraint)
Check if a value is null or not.
```cs
Random r = null;
Random r2 = new Random();
Assert.That(r, Is.Null);
Assert.That(r2, Is.Not.Null);
```

## Reflection

This part is not part of NUnit, but it's useful for C# testing.

Sometimes you want to check metadata about a class or class member. C# provides tools to do this in the namespace `System.Reflection`. Here's a basic example for the `Forest.Grow()` method:

```cs
using System.Reflection;
using Forestry;

namespace Tests
{
    [TestFixture]
    public class ForestTest
    {
       [Test]
        public void Grow_Has_No_Parameters()
        {
            MethodInfo mi = typeof(Forest).GetMethod("Grow");
            
            Assert.That(mi.GetParameters(), Has.Exactly(0).Items);
        }
    }
}
```
_What's going on here?_
1. Make sure to include `using System.Reflection`.
2. `typeof(Forest)` returns an object of type `Type`.
2. `GetMethod()` is a method of the `Type` class. It returns a `MethodInfo` object.
3. `GetParameters` is a method of the `MethodInfo` class, which is in the `System.Reflection` namespace. It returns an array of type `ParameterInfo`.

_How would I know about these types and methods? Where can I learn more?_

The [`Type`](https://docs.microsoft.com/en-us/dotnet/api/system.type) class has methods like `GetConstructor()`, `GetField()`, `GetProperty()`, `GetMethod()`, `GetInterface()`, and `IsSubClassOf()`.

Each of those "GetX()" methods returns a matching "XInfo" object. For example, `GetMethod()` returns an object of type [`MethodInfo`](https://docs.microsoft.com/en-us/dotnet/api/system.reflection.methodinfo). 

You can then make assertions on the properties and methods within each "XInfo" object. For example, `MethodInfo` has: `ReturnType`, [`GetParameters()`](https://docs.microsoft.com/en-us/dotnet/api/system.reflection.methodbase.getparameters), and [`GetMethodBody()`](https://docs.microsoft.com/en-us/dotnet/api/system.reflection.methodbase.getmethodbody). Technically these two methods are inherited from the `MethodBase` class, but you don't need to worry about that (usually).


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