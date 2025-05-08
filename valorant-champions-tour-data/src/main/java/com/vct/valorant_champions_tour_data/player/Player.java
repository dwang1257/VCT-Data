package com.vct.valorant_champions_tour_data.player;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "players")
public class Player {
    @Id
    @Column(name = "id", unique = true)
    private Integer id;


    public Player() {
    }


    private String name;

    private String team;

    private Double acs;

    private Double kd_ratio;

    private Double kast;

    private Double fkpr;

    private Double apr;

    private Double kpr;

    private Double fdpr;

    private Double cl_percent;

    private Integer rounds_played;

    public Player(Integer id, String name, String team, Double acs, Double kd_ratio, Double kast, Double fkpr, Double apr, Double kpr, Double fdpr, Double cl_percent, Integer rounds_played) {
        this.id = id;
        this.name = name;
        this.team = team;
        this.acs = acs;
        this.kd_ratio = kd_ratio;
        this.kast = kast;
        this.fkpr = fkpr;
        this.apr = apr;
        this.kpr = kpr;
        this.fdpr = fdpr;
        this.cl_percent = cl_percent;
        this.rounds_played = rounds_played;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public Double getAcs() {
        return acs;
    }

    public void setAcs(Double acs) {
        this.acs = acs;
    }

    public Double getKd_ratio() {
        return kd_ratio;
    }

    public void setKd_ratio(Double kd_ratio) {
        this.kd_ratio = kd_ratio;
    }

    public Double getKast() {
        return kast;
    }

    public void setKast(Double kast) {
        this.kast = kast;
    }

    public Double getFkpr() {
        return fkpr;
    }

    public void setFkpr(Double fkpr) {
        this.fkpr = fkpr;
    }

    public Double getApr() {
        return apr;
    }

    public void setApr(Double apr) {
        this.apr = apr;
    }

    public Double getKpr() {
        return kpr;
    }

    public void setKpr(Double kpr) {
        this.kpr = kpr;
    }

    public Double getFdpr() {
        return fdpr;
    }

    public void setFdpr(Double fdpr) {
        this.fdpr = fdpr;
    }

    public Double getCl_percent() {
        return cl_percent;
    }

    public void setCl_percent(Double cl_percent) {
        this.cl_percent = cl_percent;
    }

    public Integer getRounds_played() {
        return rounds_played;
    }

    public void setRounds_played(Integer rounds_played) {
        this.rounds_played = rounds_played;
    }
}
