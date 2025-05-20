package com.vct.valorant_champions_tour_data.player;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

//makes the a springboot component
@Component
public class PlayerService {
    private final PlayerRepository playerRepository;

    @Autowired
    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public List<Player> getPlayers() {
        return playerRepository.findAll();
    }

    public List<Player> getPlayersFromTeam(String team){
        return playerRepository.findAll().stream()
                .filter(player -> team.equals(player.getTeam()))
                .collect(Collectors.toList());
    }

    public List<Player> getPlayerByName(String searchText){
        return playerRepository.findAll().stream()
                .filter(player -> player.getName().toLowerCase().equals(searchText.toLowerCase()))
                .collect(Collectors.toList());
    }


    public List<Player> getPlayersWithAcsAbove(double threshold) {
        return playerRepository.findAll().stream()
                .filter(player -> player.getAcs() != null && player.getAcs() > threshold)
                .collect(Collectors.toList());
    }

    public List<Player> getTopNByKdRatio(int n) {
        return playerRepository.findAll().stream()
                .filter(player -> player.getKd_ratio() != null)
                .sorted((a, b) -> Double.compare(b.getKd_ratio(), a.getKd_ratio()))
                .limit(n)
                .collect(Collectors.toList());
    }

    public List<Player> getPlayersWithClutchPercentAbove(double percent) {
        return playerRepository.findAll().stream()
                .filter(player -> player.getCl_percent() != null && player.getCl_percent() > percent)
                .collect(Collectors.toList());
    }

    public List<Player> getTopNByFirstBloods(int n) {
        return playerRepository.findAll().stream()
                .filter(player -> player.getFkpr() != null)
                .sorted((a, b) -> Double.compare(b.getFkpr(), a.getFkpr()))
                .limit(n)
                .collect(Collectors.toList());
    }

    public List<Player> searchByNameAndTeam(String name, String team) {
        return playerRepository.findAll().stream()
                .filter(player -> player.getName() != null && player.getTeam() != null)
                .filter(player -> player.getName().toLowerCase().contains(name.toLowerCase()) &&
                        player.getTeam().toLowerCase().contains(team.toLowerCase()))
                .collect(Collectors.toList());
    }

    public Player addPlayer(Player player){
        playerRepository.save(player);
        return player;
    }

    @Transactional
    public void deletePlayer(String player){
        playerRepository.deleteByName(player);
    }
}
