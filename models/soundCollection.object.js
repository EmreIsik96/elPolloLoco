class SoundCollection {
    sounds =  {
        startGameAudio: new Audio("audio/game-music1.mp3"),
        gameOverAudio: new Audio('audio/game_over.mp3'),
        walking_sound: new Audio('audio/walk_char.mp3'),
        jumping_sound: new Audio('audio/jump_char.mp3'),
        hitEnemySound: new Audio("audio/boss-sound.mp3"),
        hurtCharacter: new Audio("audio/char_hurt.mp3"),
        coinCollectSound: new Audio("audio/coin-collect.mp3"),
        collectBottleSound: new Audio('audio/collect_bottle.mp3')
    }

    constructor()
    {
        this.sounds.startGameAudio.loop = true;
    }
    
    
}
