using NUnit.Framework;
using System.Reflection;
using Forestry;

namespace Tests
{
    [TestFixture]
    public class ForestTest
    {
        private Forest f;

        [Test]
        public void Has_Name_Property()
        {
            f = new Forest("Amazon", "Tropical");
            Assert.That(f, Has.Property("Name"), "Expected Forest class to have property Name.");
        }

        [Test]
        [TestCase("n/a")]
        [TestCase("0")]
        [TestCase("")]
        public void Biome_Defaults_To_Unknown(string biome)
        {
            f = new Forest("Amazon", biome);
            string expectedBiome = "Unknown";

            Assert.That(f.Biome, Is.EqualTo(expectedBiome), $"Expected Biome property to default to {expectedBiome}.");
        }

        [Test]
        public void Has_Age_Property()
        {
            f = new Forest("Amazon", "Tropical");
            Assert.That(f, Has.Property("Age"), "Expected Forest class to have property Age.");
        }

        [Test]
        public void Age_Is_GetOnly()
        {
            PropertyInfo pi = typeof(Forest).GetProperty("Age");
            
            Assert.That(pi.GetGetMethod(), Is.Not.Null);
            Assert.That(pi.GetSetMethod(), Is.Null);
        }

        [Test]
        public void ForestsCreated_Is_Static_With_Public_Getter_And_Private_Setter()
        {
            PropertyInfo pi = typeof(Forest).GetProperty("ForestsCreated", BindingFlags.Public | BindingFlags.Static);
            
            Assert.That(pi, Is.Not.Null, "Define a public static property ForestsCreated.");
            Assert.That(pi.GetGetMethod(nonPublic: false), Is.Not.Null, "Add a public getter to ForestsCreated.");
            Assert.That(pi.GetSetMethod(nonPublic: true), Is.Not.Null, "Add a setter for ForestsCreated.");
            Assert.That(pi.GetSetMethod(nonPublic: false), Is.Null, "Make the setter for ForestsCreated private.");
        }

        [Test]
        public void Constructor_Sets_Name_Biome_Age()
        {
            string newName = "Amazon";
            string newBiome = "Tropical";
            int expectedAge = 0;

            f = new Forest(newName, newBiome);

            Assert.That(f.Name, Is.EqualTo(newName));
            Assert.That(f.Biome, Is.EqualTo(newBiome));
            Assert.That(f.Age, Is.EqualTo(expectedAge));
        }
        
        [Test]
        public void Grow_Has_No_Parameters()
        {
            MethodInfo mi = typeof(Forest).GetMethod("Grow");
            
            Assert.That(mi.GetParameters(), Has.Exactly(0).Items);
        }
        
        [Test]
        public void Grow_Increases_Trees_And_Age()
        {
            f = new Forest("Amazon", "Tropical");
            int initialTrees = f.Trees;
            int initialAge = f.Age;
            int expectedTrees = initialTrees + 30;
            int expectedAge = initialAge + 1;

            f.Grow();

            Assert.That(f.Trees, Is.EqualTo(expectedTrees));
            Assert.That(f.Age, Is.EqualTo(expectedAge));
        }
        
        [Test]
        public void Grow_Returns_Trees()
        {
            MethodInfo mi = typeof(Forest).GetMethod("Grow");

            Assert.That(mi.ReturnType, Is.EqualTo(typeof(System.Int32)));
        }

        [Test]
        public void PrintTreeFacts_Is_Static_And_Void()
        {
            MethodInfo mi = typeof(Forest).GetMethod("PrintTreeFacts", BindingFlags.Public | BindingFlags.Static);

            Assert.That(mi, Is.Not.Null, "Define a public static method `PrintTreeFacts`.");
            Assert.That(mi.ReturnType, Is.EqualTo(typeof(void)), "`PrintTreeFacts` should have a return type of `void`.");
        }
        
        
    }
}