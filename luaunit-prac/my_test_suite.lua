local lu = require('luaunit')

function testSubOneArg()
  local str = 'hello'
  local substr = 'ello'
  lu.assertEquals(str:sub(2), substr)
end

function testSubNegativeArg()
  local str = 'hello'
  local substr = 'lo'
  lu.assertEquals(str:sub(-2), substr)
end

function testSubError()
  local str = 'hello'
  local msg = 'bad argument'
  lu.assertErrorMsgContains(msg, string.sub)
end

os.exit( lu.LuaUnit.run() )
