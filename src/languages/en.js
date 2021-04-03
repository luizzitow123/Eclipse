module.exports = async (client) => {
    client.lang.en = {
        geral: {
            naoTa: "Please connect to a voice channel",
            mesmo: "Please connect to the same voice channel as me",
            nada: "There's nothing playing this server"
        },
        voiceUpdate: {
            sairei: "Leaving",
            em: "in",
            minuto: "because I was left alone.",
            sai: "I left",
            final: "because I was left alone."
        },
        erela: {
            tocando: "Playing now",
            solicitado: "Music requested by",
            saindo: "Leaving the voice channel. No more songs"
        },
        message: {
            prefixo: "My prefix is",
            desabilitado: "This command is disabled",
            dono: "This command is only released to the bot owner",
            nsfw: "This command can only be used on NSFW channels",
            args: "Sorry, this command requires arguments to work. Use:",
            userPerms: "This permission is missing",
            userPerms2: "for you to use this command",
            botPerm: "I'm missing this(these) permission",
            botPerm2: "to run this command"
        },
        help: {
            invalid: "Invalid Command named",
            Aliases: "No Aliases",
            description: "Description",
            category: "Category",
            usage: "Usage",
            dev: "Developer",
            musica: "Music",
            filtros: "Filters",
            outros: "Others",
            footer: "Do not include <> or [], it means <> is required and [] is optional"
        },
        ping: {
            pong: '**Pong!** My ping is from',
            latency: 'API latency is'
        },
        play: {
            semCanal: "Enter a voice channel and use the command again",
            semPerm: "I am not allowed to connect to the voice channel test",
            tocandoJa: "I'm already playing music on this server",
            erro: "An error happened sorry",
            semResultado: "I didn't find results",
            musgaAdd: "Music added",
            duracao: "Duration",
            solicitado: "Requested by",
            playlist: "Added playlist",
            com: "with",
            musicas: "songs",
            fila: "Added",
            fila2: "the queue"
        },
        botinfo: {
            servidores: "Servers",
            tocandoEm: "Playing in",
            memoria: "RAM usage",
            suporte: "Support server",
            convide: "Invite me"
        },
        search: {
            semCanal: "Enter a voice channel and use the command again",
            semPerm: "I am not allowed to connect to the voice channel test",
            tocandoJa: "I'm already playing music on this server",
            erro: "An error happened sorry",
            semResultado: "I didn't find results",
            fila: "Added",
            fila2: "the queue",
            semLink: "Please do not place links",
            numero: "Send the song number to add the queue. If you want to cancel send",
            tempo: "Selection time is over",
            cancel: "Selection canceled",
            invalid: "You gave an invalid number",
            solicitado: "Requested by",
            duracao: "Duration",
            por: "By"
        },
        bassboost: {
            nada: "There's nothing playing at the moment",
            tocandoJa: "I'm already playing music on this server",
            ativado: "Bassboost enabled",
            desativado: "Bassboost disabled"
        },
        queue: {
            nothing: "There is no music playing, unfortunately",
            np: "Now playing",
            fila: "Play queue",
            nohasmusic: "There is no music in the",
            arg1: "page",
            arg2: "queue",
            arg3: "of"
        },
        np: {
            nada: "There's nothing playing at the moment"
        },
        vaporwave: {
            ativado: "Vaporwave filter activated",
            desativado: "Vaporwave filter desactived"
        },
        nightcore: {
            ativado: "Nightcore filter activated",
            desativado: "Nightcore filter desactived"
        },
        stop: {
            nada: "There is nothing playing",
            conectar: "You have to connect to some voice channel",
            conectar2: "Connect to the same voice channel as me",
            parou: "Player stopped"
        },
        skip: {
            nada: "There is nothing playing",
            conectar: "You have to connect to some voice channel",
            conectar2: "Connect to the same voice channel as me",
            feito: " was skipped"
        },
        volume: {
            nada: "There is nothing playing",
            conectar: "You have to connect to some voice channel",
            conectar2: "Connect to the same voice channel as me",
            invalido: "You have to put number between 1 and 100",
            mudado: "I've changed the player volume to ",
            setadoJa: "The volume of the player is "
        },
        shuffle: {
            finish: "I shuffled the music queue"
        },
        pause: {
            pausadoJa: "Music is already paused",
            pausado: "Paused the music"
        },
        resume: {
            resumidoJa: "Music is not paused",
            resumido: ""
        }
    }
}