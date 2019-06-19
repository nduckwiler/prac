using NUnit.Framework;
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
        public void Biome_Property_Defaults_To_Unknown(string biome)
        {
            f = new Forest("Amazon", biome);
            string expectedBiome = "Unknown";

            Assert.That(f.Biome == expectedBiome);
        }
    }
}