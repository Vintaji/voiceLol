const axios = require('axios');

const apiKey = process.API_KEY;
const summonerName = 'Ventiware#075';

async function getSummonerId(summonerName) {
    try {
        const summonerResponse = await axios.get(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`);
        return summonerResponse.data.id;
    } catch (error) {
        console.error('Erro ao obter o ID do invocador:', error.response ? error.response.data : error.message);
        throw error;
    }
}

async function getLatestMatchId(summonerId) {
    try {
        const matchlistResponse = await axios.get(`https://br1.api.riotgames.com/lol/match/v4/matchlists/by-account/${summonerId}?api_key=${apiKey}`);
        const latestMatch = matchlistResponse.data.matches[0];
        return latestMatch.gameId;
    } catch (error) {
        console.error('Erro ao obter o ID da última partida:', error.response ? error.response.data : error.message);
        throw error;
    }
}

async function getMatchDetails(matchId) {
    try {
        const matchResponse = await axios.get(`https://br1.api.riotgames.com/lol/match/v4/matches/${matchId}?api_key=${apiKey}`);
        return matchResponse.data;
    } catch (error) {
        console.error('Erro ao obter detalhes da partida:', error.response ? error.response.data : error.message);
        throw error;
    }
}

async function main() {
    try {
        const summonerId = await getSummonerId(summonerName);
        const latestMatchId = await getLatestMatchId(summonerId);
        const matchDetails = await getMatchDetails(latestMatchId);

        // Exemplo de como acessar informações sobre os jogadores na partida
        const participants = matchDetails.participants;
        participants.forEach(participant => {
            const summonerName = participant.summonerName;
            const championId = participant.championId;
            console.log(`Jogador: ${summonerName}, Campeão: ${championId}`);
        });
    } catch (error) {
        console.error('Erro:', error.message);
    }
}

main();
