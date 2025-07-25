// kubejs/server_scripts/open_rules_screen.js

const Commands = Java.loadClass('com.mojang.brigadier.builder.LiteralArgumentBuilder')

ServerEvents.commandRegistry(event => {
  event.register(
    Commands.literal("rules")
      .requires(source => source.hasPermission(0))
      .executes(ctx => {
        const player = ctx.source.getPlayerOrException()
        
        // Выполняем команду от имени игрока на сервере
        const server = ctx.source.getServer()
        const commandSource = server.createCommandSourceStack()
          .withEntity(player)
          .withPosition(player.position())
          .withLevel(player.level)
        
        server.getCommands().performPrefixedCommand(commandSource, "openguiscreen rules_screen")
        
        return 1
      })
  )
})