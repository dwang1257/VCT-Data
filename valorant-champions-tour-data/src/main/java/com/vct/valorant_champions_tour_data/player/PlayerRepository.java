package com.vct.valorant_champions_tour_data.player;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PlayerRepository extends JpaRepository<Player, Integer> {
    void deleteByName(String name);

    Optional<Player> findByName(String name);


}
