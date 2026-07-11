import React, { useState, useMemo, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer, LabelList
} from "recharts";
import { Search, GraduationCap, TrendingDown, Users, Target, Sun, Moon, ListChecks, LayoutDashboard } from "lucide-react";

// ===== VERSIUNE APLICAȚIE — actualizează la fiecare livrare =====
const APP_VERSIUNE = "v4";
const APP_MODIFICAT = "11 iulie 2026";

const PALETTES = {
  dark: {
    border: "#2C3040",
    textDim: "#93908A",
    accent: "#C1352E",
    gold: "#C9A24B",
    cursor: "rgba(255,255,255,0.04)",
  },
  light: {
    border: "#D9D5C8",
    textDim: "#6B675E",
    accent: "#B3312C",
    gold: "#9C7A22",
    cursor: "rgba(0,0,0,0.04)",
  },
};

const DATA_BY_YEAR = {"2025":{"licee":[{"rank":1,"cod":"4061103134","nume":"Colegiul Naţional „Gheorghe Lazăr”","specializari":[{"nume":"Matematică-Informatică","total":79,"prag":9.82,"max":10.0,"medie":9.899,"densitatePrag":79,"densitatePragPct":100.0,"distributie":[{"media":10.0,"nr":6},{"media":9.97,"nr":3},{"media":9.95,"nr":11},{"media":9.92,"nr":9},{"media":9.9,"nr":16},{"media":9.87,"nr":8},{"media":9.85,"nr":23},{"media":9.82,"nr":3}]},{"nume":"Ştiinţe ale Naturii","total":78,"prag":9.8,"max":10.0,"medie":9.865,"densitatePrag":78,"densitatePragPct":100.0,"distributie":[{"media":10.0,"nr":6},{"media":9.97,"nr":3},{"media":9.95,"nr":4},{"media":9.92,"nr":3},{"media":9.9,"nr":6},{"media":9.87,"nr":9},{"media":9.85,"nr":16},{"media":9.82,"nr":20},{"media":9.8,"nr":11}]},{"nume":"Ştiinţe Sociale","total":52,"prag":9.65,"max":10.0,"medie":9.731,"densitatePrag":46,"densitatePragPct":88.5,"distributie":[{"media":10.0,"nr":1},{"media":9.92,"nr":1},{"media":9.9,"nr":2},{"media":9.87,"nr":2},{"media":9.85,"nr":1},{"media":9.8,"nr":2},{"media":9.77,"nr":3},{"media":9.75,"nr":4},{"media":9.72,"nr":10},{"media":9.7,"nr":9},{"media":9.67,"nr":13},{"media":9.65,"nr":4}]},{"nume":"Filologie","total":26,"prag":9.62,"max":9.95,"medie":9.702,"densitatePrag":23,"densitatePragPct":88.5,"distributie":[{"media":9.95,"nr":1},{"media":9.92,"nr":1},{"media":9.9,"nr":1},{"media":9.82,"nr":1},{"media":9.77,"nr":1},{"media":9.75,"nr":2},{"media":9.72,"nr":2},{"media":9.7,"nr":1},{"media":9.67,"nr":2},{"media":9.65,"nr":8},{"media":9.62,"nr":6}]}]},{"rank":2,"cod":"4061103541","nume":"Colegiul Naţional „Sfântul Sava”","specializari":[{"nume":"Ştiinţe ale Naturii","total":26,"prag":9.82,"max":10.0,"medie":9.902,"densitatePrag":26,"densitatePragPct":100.0,"distributie":[{"media":10.0,"nr":3},{"media":9.95,"nr":7},{"media":9.92,"nr":1},{"media":9.9,"nr":4},{"media":9.87,"nr":2},{"media":9.85,"nr":5},{"media":9.82,"nr":4}]},{"nume":"Matematică-Informatică","total":130,"prag":9.72,"max":10.0,"medie":9.792,"densitatePrag":124,"densitatePragPct":95.4,"distributie":[{"media":10.0,"nr":1},{"media":9.97,"nr":1},{"media":9.95,"nr":4},{"media":9.92,"nr":4},{"media":9.9,"nr":8},{"media":9.87,"nr":4},{"media":9.85,"nr":5},{"media":9.82,"nr":9},{"media":9.8,"nr":18},{"media":9.77,"nr":25},{"media":9.75,"nr":27},{"media":9.72,"nr":24}]},{"nume":"Matematică-Informatică (bilingv engleză, cu examen)","total":26,"prag":9.82,"max":10.0,"medie":9.892,"densitatePrag":26,"densitatePragPct":100.0,"distributie":[{"media":10.0,"nr":3},{"media":9.97,"nr":1},{"media":9.95,"nr":1},{"media":9.92,"nr":3},{"media":9.9,"nr":6},{"media":9.87,"nr":2},{"media":9.85,"nr":6},{"media":9.82,"nr":4}]},{"nume":"Filologie","total":26,"prag":9.6,"max":10.0,"medie":9.67,"densitatePrag":23,"densitatePragPct":88.5,"distributie":[{"media":10.0,"nr":1},{"media":9.95,"nr":1},{"media":9.85,"nr":1},{"media":9.8,"nr":1},{"media":9.75,"nr":1},{"media":9.7,"nr":2},{"media":9.67,"nr":1},{"media":9.65,"nr":2},{"media":9.62,"nr":5},{"media":9.6,"nr":11}]}]},{"rank":3,"cod":"4061101851","nume":"Colegiul Național „Spiru Haret”","specializari":[{"nume":"Matematică-Informatică","total":52,"prag":9.75,"max":9.95,"medie":9.788,"densitatePrag":52,"densitatePragPct":100.0,"distributie":[{"media":9.95,"nr":2},{"media":9.92,"nr":1},{"media":9.87,"nr":1},{"media":9.85,"nr":2},{"media":9.82,"nr":2},{"media":9.8,"nr":12},{"media":9.77,"nr":16},{"media":9.75,"nr":16}]},{"nume":"Matematică-Informatică (bilingv engleză, cu examen)","total":26,"prag":9.8,"max":10.0,"medie":9.875,"densitatePrag":26,"densitatePragPct":100.0,"distributie":[{"media":10.0,"nr":1},{"media":9.97,"nr":1},{"media":9.95,"nr":2},{"media":9.92,"nr":3},{"media":9.9,"nr":2},{"media":9.87,"nr":7},{"media":9.85,"nr":2},{"media":9.82,"nr":7},{"media":9.8,"nr":1}]},{"nume":"Ştiinţe ale Naturii","total":52,"prag":9.72,"max":9.97,"medie":9.789,"densitatePrag":50,"densitatePragPct":96.2,"distributie":[{"media":9.97,"nr":1},{"media":9.95,"nr":1},{"media":9.9,"nr":4},{"media":9.87,"nr":3},{"media":9.82,"nr":1},{"media":9.8,"nr":10},{"media":9.77,"nr":14},{"media":9.75,"nr":11},{"media":9.73,"nr":1},{"media":9.72,"nr":6}]},{"nume":"Ştiinţe Sociale","total":52,"prag":9.57,"max":9.85,"medie":9.647,"densitatePrag":49,"densitatePragPct":94.2,"distributie":[{"media":9.85,"nr":2},{"media":9.82,"nr":1},{"media":9.77,"nr":1},{"media":9.75,"nr":1},{"media":9.72,"nr":5},{"media":9.7,"nr":4},{"media":9.67,"nr":2},{"media":9.65,"nr":4},{"media":9.62,"nr":11},{"media":9.6,"nr":15},{"media":9.57,"nr":6}]},{"nume":"Filologie","total":26,"prag":9.52,"max":9.9,"medie":9.585,"densitatePrag":24,"densitatePragPct":92.3,"distributie":[{"media":9.9,"nr":1},{"media":9.85,"nr":1},{"media":9.6,"nr":1},{"media":9.57,"nr":12},{"media":9.55,"nr":10},{"media":9.52,"nr":1}]}]},{"rank":4,"cod":"4061101408","nume":"Colegiul Naţional de Informatică „Tudor Vianu”","specializari":[{"nume":"Matematică-Informatică","total":208,"prag":9.62,"max":10.0,"medie":9.748,"densitatePrag":162,"densitatePragPct":77.9,"distributie":[{"media":10.0,"nr":8},{"media":9.97,"nr":1},{"media":9.95,"nr":4},{"media":9.92,"nr":5},{"media":9.9,"nr":8},{"media":9.87,"nr":12},{"media":9.85,"nr":8},{"media":9.82,"nr":6},{"media":9.8,"nr":13},{"media":9.77,"nr":17},{"media":9.75,"nr":8},{"media":9.72,"nr":19},{"media":9.7,"nr":25},{"media":9.67,"nr":29},{"media":9.65,"nr":31},{"media":9.62,"nr":14}]},{"nume":"Matematică-Informatică (bilingv germană, fără examen)","total":26,"prag":9.67,"max":10.0,"medie":9.795,"densitatePrag":18,"densitatePragPct":69.2,"distributie":[{"media":10.0,"nr":3},{"media":9.95,"nr":1},{"media":9.92,"nr":1},{"media":9.9,"nr":3},{"media":9.85,"nr":1},{"media":9.82,"nr":1},{"media":9.77,"nr":1},{"media":9.75,"nr":2},{"media":9.72,"nr":4},{"media":9.7,"nr":8},{"media":9.67,"nr":1}]}]},{"rank":5,"cod":"4061103419","nume":"Colegiul Naţional „Grigore Moisil”","specializari":[{"nume":"Ştiinţe ale Naturii","total":26,"prag":9.6,"max":9.9,"medie":9.676,"densitatePrag":24,"densitatePragPct":92.3,"distributie":[{"media":9.9,"nr":1},{"media":9.85,"nr":1},{"media":9.8,"nr":1},{"media":9.77,"nr":1},{"media":9.72,"nr":1},{"media":9.7,"nr":2},{"media":9.67,"nr":6},{"media":9.65,"nr":5},{"media":9.62,"nr":3},{"media":9.6,"nr":5}]},{"nume":"Matematică-Informatică","total":78,"prag":9.52,"max":9.97,"medie":9.648,"densitatePrag":62,"densitatePragPct":79.5,"distributie":[{"media":9.97,"nr":1},{"media":9.92,"nr":1},{"media":9.87,"nr":1},{"media":9.85,"nr":3},{"media":9.82,"nr":2},{"media":9.8,"nr":1},{"media":9.77,"nr":3},{"media":9.75,"nr":4},{"media":9.72,"nr":6},{"media":9.7,"nr":2},{"media":9.67,"nr":5},{"media":9.65,"nr":6},{"media":9.62,"nr":8},{"media":9.6,"nr":6},{"media":9.57,"nr":14},{"media":9.55,"nr":7},{"media":9.52,"nr":8}]},{"nume":"Ştiinţe Sociale","total":26,"prag":9.35,"max":9.67,"medie":9.445,"densitatePrag":25,"densitatePragPct":96.2,"distributie":[{"media":9.67,"nr":1},{"media":9.55,"nr":1},{"media":9.52,"nr":1},{"media":9.5,"nr":2},{"media":9.47,"nr":8},{"media":9.45,"nr":1},{"media":9.42,"nr":3},{"media":9.4,"nr":2},{"media":9.37,"nr":5},{"media":9.35,"nr":2}]},{"nume":"Filologie","total":26,"prag":9.25,"max":9.62,"medie":9.327,"densitatePrag":24,"densitatePragPct":92.3,"distributie":[{"media":9.62,"nr":1},{"media":9.55,"nr":1},{"media":9.42,"nr":1},{"media":9.37,"nr":1},{"media":9.35,"nr":1},{"media":9.32,"nr":9},{"media":9.3,"nr":3},{"media":9.27,"nr":8},{"media":9.25,"nr":1}]}]},{"rank":6,"cod":"4061100217","nume":"Colegiul Național Bilingv „George Coșbuc”","specializari":[{"nume":"Ştiinţe ale Naturii","total":26,"prag":9.57,"max":9.82,"medie":9.663,"densitatePrag":25,"densitatePragPct":96.2,"distributie":[{"media":9.82,"nr":1},{"media":9.75,"nr":1},{"media":9.72,"nr":1},{"media":9.7,"nr":7},{"media":9.67,"nr":3},{"media":9.65,"nr":4},{"media":9.62,"nr":4},{"media":9.6,"nr":4},{"media":9.57,"nr":1}]},{"nume":"Matematică-Informatică","total":52,"prag":9.5,"max":9.82,"medie":9.593,"densitatePrag":45,"densitatePragPct":86.5,"distributie":[{"media":9.82,"nr":2},{"media":9.77,"nr":2},{"media":9.72,"nr":3},{"media":9.7,"nr":3},{"media":9.67,"nr":1},{"media":9.65,"nr":5},{"media":9.62,"nr":1},{"media":9.57,"nr":9},{"media":9.55,"nr":10},{"media":9.52,"nr":11},{"media":9.5,"nr":5}]},{"nume":"Ştiinţe Sociale","total":26,"prag":9.47,"max":9.92,"medie":9.571,"densitatePrag":21,"densitatePragPct":80.8,"distributie":[{"media":9.92,"nr":1},{"media":9.9,"nr":1},{"media":9.72,"nr":1},{"media":9.7,"nr":2},{"media":9.65,"nr":1},{"media":9.63,"nr":1},{"media":9.62,"nr":1},{"media":9.57,"nr":2},{"media":9.55,"nr":2},{"media":9.52,"nr":2},{"media":9.5,"nr":3},{"media":9.47,"nr":9}]},{"nume":"Filologie","total":52,"prag":9.3,"max":9.57,"medie":9.395,"densitatePrag":50,"densitatePragPct":96.2,"distributie":[{"media":9.57,"nr":1},{"media":9.52,"nr":1},{"media":9.5,"nr":1},{"media":9.47,"nr":2},{"media":9.45,"nr":10},{"media":9.42,"nr":5},{"media":9.4,"nr":9},{"media":9.37,"nr":6},{"media":9.35,"nr":7},{"media":9.32,"nr":8},{"media":9.3,"nr":2}]}]},{"rank":7,"cod":"4061103012","nume":"Colegiul Național „Matei Basarab”","specializari":[{"nume":"Matematică-Informatică","total":104,"prag":9.55,"max":9.9,"medie":9.651,"densitatePrag":94,"densitatePragPct":90.4,"distributie":[{"media":9.9,"nr":1},{"media":9.85,"nr":1},{"media":9.82,"nr":2},{"media":9.8,"nr":3},{"media":9.77,"nr":3},{"media":9.75,"nr":1},{"media":9.72,"nr":4},{"media":9.7,"nr":13},{"media":9.67,"nr":13},{"media":9.65,"nr":12},{"media":9.62,"nr":17},{"media":9.6,"nr":17},{"media":9.57,"nr":14},{"media":9.55,"nr":3}]},{"nume":"Ştiinţe ale Naturii","total":52,"prag":9.55,"max":9.9,"medie":9.659,"densitatePrag":47,"densitatePragPct":90.4,"distributie":[{"media":9.9,"nr":1},{"media":9.85,"nr":1},{"media":9.82,"nr":1},{"media":9.8,"nr":1},{"media":9.77,"nr":1},{"media":9.75,"nr":5},{"media":9.73,"nr":1},{"media":9.72,"nr":2},{"media":9.7,"nr":4},{"media":9.67,"nr":7},{"media":9.65,"nr":5},{"media":9.62,"nr":1},{"media":9.6,"nr":11},{"media":9.57,"nr":9},{"media":9.55,"nr":2}]},{"nume":"Ştiinţe Sociale","total":26,"prag":9.47,"max":9.75,"medie":9.549,"densitatePrag":23,"densitatePragPct":88.5,"distributie":[{"media":9.75,"nr":2},{"media":9.7,"nr":1},{"media":9.6,"nr":2},{"media":9.57,"nr":2},{"media":9.55,"nr":3},{"media":9.52,"nr":7},{"media":9.51,"nr":1},{"media":9.5,"nr":6},{"media":9.47,"nr":2}]},{"nume":"Filologie","total":26,"prag":9.42,"max":9.7,"medie":9.472,"densitatePrag":25,"densitatePragPct":96.2,"distributie":[{"media":9.7,"nr":1},{"media":9.62,"nr":1},{"media":9.52,"nr":1},{"media":9.5,"nr":2},{"media":9.47,"nr":6},{"media":9.45,"nr":10},{"media":9.42,"nr":5}]}]},{"rank":8,"cod":"4061103306","nume":"Colegiul Naţional „I.L.Caragiale”","specializari":[{"nume":"Ştiinţe ale Naturii","total":26,"prag":9.55,"max":9.8,"medie":9.62,"densitatePrag":24,"densitatePragPct":92.3,"distributie":[{"media":9.8,"nr":2},{"media":9.75,"nr":1},{"media":9.72,"nr":1},{"media":9.7,"nr":2},{"media":9.67,"nr":1},{"media":9.62,"nr":4},{"media":9.6,"nr":4},{"media":9.57,"nr":3},{"media":9.55,"nr":8}]},{"nume":"Matematică-Informatică","total":78,"prag":9.47,"max":9.77,"medie":9.546,"densitatePrag":74,"densitatePragPct":94.9,"distributie":[{"media":9.77,"nr":1},{"media":9.72,"nr":1},{"media":9.7,"nr":2},{"media":9.67,"nr":1},{"media":9.65,"nr":2},{"media":9.62,"nr":1},{"media":9.6,"nr":9},{"media":9.57,"nr":8},{"media":9.55,"nr":7},{"media":9.52,"nr":24},{"media":9.5,"nr":15},{"media":9.47,"nr":7}]},{"nume":"Matematică-Informatică (bilingv germană, cu examen)","total":13,"prag":9.72,"max":10.0,"medie":9.81,"densitatePrag":12,"densitatePragPct":92.3,"distributie":[{"media":10.0,"nr":1},{"media":9.87,"nr":1},{"media":9.85,"nr":2},{"media":9.82,"nr":2},{"media":9.8,"nr":2},{"media":9.77,"nr":1},{"media":9.76,"nr":1},{"media":9.75,"nr":1},{"media":9.72,"nr":2}]},{"nume":"Matematică-Informatică (bilingv germană, fără examen)","total":13,"prag":9.6,"max":9.8,"medie":9.665,"densitatePrag":13,"densitatePragPct":100.0,"distributie":[{"media":9.8,"nr":1},{"media":9.75,"nr":2},{"media":9.7,"nr":1},{"media":9.67,"nr":2},{"media":9.65,"nr":1},{"media":9.62,"nr":3},{"media":9.6,"nr":3}]},{"nume":"Matematică-Informatică (bilingv engleză)","total":26,"prag":9.6,"max":9.75,"medie":9.64,"densitatePrag":26,"densitatePragPct":100.0,"distributie":[{"media":9.75,"nr":1},{"media":9.72,"nr":2},{"media":9.7,"nr":2},{"media":9.67,"nr":4},{"media":9.62,"nr":8},{"media":9.6,"nr":9}]},{"nume":"Ştiinţe Sociale","total":26,"prag":9.42,"max":9.6,"medie":9.487,"densitatePrag":26,"densitatePragPct":100.0,"distributie":[{"media":9.6,"nr":1},{"media":9.57,"nr":1},{"media":9.55,"nr":2},{"media":9.52,"nr":4},{"media":9.5,"nr":2},{"media":9.47,"nr":8},{"media":9.45,"nr":6},{"media":9.42,"nr":2}]},{"nume":"Filologie","total":26,"prag":9.3,"max":9.75,"medie":9.35,"densitatePrag":25,"densitatePragPct":96.2,"distributie":[{"media":9.75,"nr":1},{"media":9.4,"nr":3},{"media":9.37,"nr":2},{"media":9.35,"nr":5},{"media":9.32,"nr":8},{"media":9.3,"nr":7}]},{"nume":"Filologie (bilingv germană, cu examen)","total":13,"prag":9.17,"max":9.57,"medie":9.352,"densitatePrag":8,"densitatePragPct":61.5,"distributie":[{"media":9.57,"nr":2},{"media":9.52,"nr":1},{"media":9.47,"nr":1},{"media":9.45,"nr":1},{"media":9.37,"nr":1},{"media":9.35,"nr":1},{"media":9.25,"nr":1},{"media":9.23,"nr":1},{"media":9.22,"nr":1},{"media":9.2,"nr":2},{"media":9.17,"nr":1}]},{"nume":"Filologie (bilingv germană, fără examen)","total":13,"prag":9.27,"max":9.48,"medie":9.328,"densitatePrag":12,"densitatePragPct":92.3,"distributie":[{"media":9.48,"nr":1},{"media":9.41,"nr":1},{"media":9.4,"nr":1},{"media":9.36,"nr":1},{"media":9.32,"nr":2},{"media":9.3,"nr":3},{"media":9.27,"nr":4}]},{"nume":"Filologie (bilingv engleză, cu examen)","total":26,"prag":9.35,"max":9.72,"medie":9.436,"densitatePrag":23,"densitatePragPct":88.5,"distributie":[{"media":9.72,"nr":1},{"media":9.6,"nr":1},{"media":9.57,"nr":1},{"media":9.52,"nr":1},{"media":9.5,"nr":2},{"media":9.42,"nr":6},{"media":9.4,"nr":8},{"media":9.37,"nr":5},{"media":9.35,"nr":1}]}]},{"rank":9,"cod":"4061101756","nume":"Colegiul Naţional „Gheorghe Şincai”","specializari":[{"nume":"Ştiinţe ale Naturii","total":52,"prag":9.52,"max":9.82,"medie":9.596,"densitatePrag":49,"densitatePragPct":94.2,"distributie":[{"media":9.82,"nr":2},{"media":9.75,"nr":1},{"media":9.72,"nr":1},{"media":9.7,"nr":2},{"media":9.67,"nr":3},{"media":9.65,"nr":4},{"media":9.62,"nr":4},{"media":9.6,"nr":6},{"media":9.57,"nr":6},{"media":9.55,"nr":14},{"media":9.52,"nr":9}]},{"nume":"Matematică-Informatică","total":130,"prag":9.47,"max":9.95,"medie":9.565,"densitatePrag":114,"densitatePragPct":87.7,"distributie":[{"media":9.95,"nr":1},{"media":9.82,"nr":2},{"media":9.77,"nr":2},{"media":9.75,"nr":2},{"media":9.72,"nr":4},{"media":9.7,"nr":5},{"media":9.67,"nr":6},{"media":9.65,"nr":8},{"media":9.62,"nr":1},{"media":9.6,"nr":8},{"media":9.57,"nr":11},{"media":9.55,"nr":9},{"media":9.52,"nr":26},{"media":9.5,"nr":29},{"media":9.47,"nr":16}]},{"nume":"Filologie","total":52,"prag":9.35,"max":9.7,"medie":9.426,"densitatePrag":49,"densitatePragPct":94.2,"distributie":[{"media":9.7,"nr":1},{"media":9.65,"nr":2},{"media":9.55,"nr":1},{"media":9.52,"nr":4},{"media":9.5,"nr":2},{"media":9.47,"nr":3},{"media":9.45,"nr":6},{"media":9.42,"nr":6},{"media":9.4,"nr":6},{"media":9.37,"nr":8},{"media":9.35,"nr":13}]}]},{"rank":10,"cod":"4061101688","nume":"Colegiul Național „Mihai Viteazul”","specializari":[{"nume":"Ştiinţe ale Naturii","total":52,"prag":9.5,"max":10.0,"medie":9.641,"densitatePrag":41,"densitatePragPct":78.8,"distributie":[{"media":10.0,"nr":1},{"media":9.97,"nr":1},{"media":9.92,"nr":1},{"media":9.87,"nr":1},{"media":9.82,"nr":1},{"media":9.77,"nr":2},{"media":9.72,"nr":4},{"media":9.7,"nr":4},{"media":9.67,"nr":3},{"media":9.65,"nr":2},{"media":9.62,"nr":7},{"media":9.6,"nr":7},{"media":9.57,"nr":2},{"media":9.55,"nr":8},{"media":9.52,"nr":7},{"media":9.5,"nr":1}]},{"nume":"Matematică-Informatică","total":208,"prag":9.4,"max":9.9,"medie":9.53,"densitatePrag":157,"densitatePragPct":75.5,"distributie":[{"media":9.9,"nr":2},{"media":9.85,"nr":1},{"media":9.82,"nr":1},{"media":9.8,"nr":3},{"media":9.78,"nr":1},{"media":9.77,"nr":2},{"media":9.75,"nr":5},{"media":9.72,"nr":3},{"media":9.7,"nr":8},{"media":9.67,"nr":3},{"media":9.65,"nr":8},{"media":9.62,"nr":14},{"media":9.6,"nr":14},{"media":9.57,"nr":11},{"media":9.55,"nr":4},{"media":9.52,"nr":11},{"media":9.5,"nr":17},{"media":9.47,"nr":25},{"media":9.45,"nr":27},{"media":9.42,"nr":22},{"media":9.4,"nr":26}]}]},{"rank":11,"cod":"4061102341","nume":"Colegiul Național „Iulia Hașdeu”","specializari":[{"nume":"Ştiinţe ale Naturii","total":26,"prag":9.45,"max":9.82,"medie":9.523,"densitatePrag":24,"densitatePragPct":92.3,"distributie":[{"media":9.82,"nr":1},{"media":9.75,"nr":1},{"media":9.6,"nr":1},{"media":9.57,"nr":2},{"media":9.55,"nr":2},{"media":9.52,"nr":2},{"media":9.5,"nr":8},{"media":9.47,"nr":5},{"media":9.45,"nr":4}]},{"nume":"Matematică-Informatică","total":52,"prag":9.35,"max":9.8,"medie":9.42,"densitatePrag":47,"densitatePragPct":90.4,"distributie":[{"media":9.8,"nr":1},{"media":9.7,"nr":2},{"media":9.67,"nr":1},{"media":9.57,"nr":1},{"media":9.5,"nr":1},{"media":9.47,"nr":2},{"media":9.45,"nr":2},{"media":9.42,"nr":7},{"media":9.4,"nr":10},{"media":9.37,"nr":18},{"media":9.35,"nr":7}]},{"nume":"Matematică-Informatică (bilingv engleză, cu examen)","total":26,"prag":9.45,"max":9.82,"medie":9.551,"densitatePrag":23,"densitatePragPct":88.5,"distributie":[{"media":9.82,"nr":1},{"media":9.67,"nr":2},{"media":9.65,"nr":1},{"media":9.62,"nr":1},{"media":9.6,"nr":3},{"media":9.57,"nr":1},{"media":9.55,"nr":3},{"media":9.52,"nr":5},{"media":9.5,"nr":3},{"media":9.47,"nr":4},{"media":9.45,"nr":2}]},{"nume":"Filologie","total":52,"prag":9.22,"max":9.62,"medie":9.293,"densitatePrag":47,"densitatePragPct":90.4,"distributie":[{"media":9.62,"nr":1},{"media":9.6,"nr":1},{"media":9.52,"nr":1},{"media":9.5,"nr":1},{"media":9.47,"nr":1},{"media":9.42,"nr":1},{"media":9.4,"nr":1},{"media":9.37,"nr":1},{"media":9.35,"nr":1},{"media":9.32,"nr":4},{"media":9.3,"nr":2},{"media":9.27,"nr":15},{"media":9.25,"nr":8},{"media":9.22,"nr":14}]},{"nume":"Filologie (bilingv spaniolă, cu examen)","total":26,"prag":8.6,"max":9.32,"medie":8.881,"densitatePrag":10,"densitatePragPct":38.5,"distributie":[{"media":9.32,"nr":1},{"media":9.22,"nr":1},{"media":9.15,"nr":1},{"media":9.1,"nr":1},{"media":9.07,"nr":2},{"media":9.05,"nr":2},{"media":8.97,"nr":1},{"media":8.92,"nr":2},{"media":8.87,"nr":2},{"media":8.85,"nr":1},{"media":8.82,"nr":2},{"media":8.8,"nr":1},{"media":8.75,"nr":1},{"media":8.72,"nr":1},{"media":8.7,"nr":1},{"media":8.67,"nr":1},{"media":8.65,"nr":4},{"media":8.6,"nr":1}]},{"nume":"Filologie (bilingv engleză, cu examen)","total":26,"prag":9.27,"max":9.65,"medie":9.366,"densitatePrag":24,"densitatePragPct":92.3,"distributie":[{"media":9.65,"nr":1},{"media":9.52,"nr":1},{"media":9.47,"nr":1},{"media":9.45,"nr":2},{"media":9.42,"nr":1},{"media":9.4,"nr":1},{"media":9.37,"nr":5},{"media":9.35,"nr":1},{"media":9.32,"nr":6},{"media":9.3,"nr":5},{"media":9.27,"nr":2}]}]},{"rank":12,"cod":"4061103265","nume":"Colegiul Naţional „Ion Creangă”","specializari":[{"nume":"Matematică-Informatică","total":52,"prag":9.37,"max":9.67,"medie":9.429,"densitatePrag":51,"densitatePragPct":98.1,"distributie":[{"media":9.67,"nr":1},{"media":9.57,"nr":1},{"media":9.52,"nr":1},{"media":9.5,"nr":1},{"media":9.47,"nr":8},{"media":9.45,"nr":6},{"media":9.42,"nr":12},{"media":9.4,"nr":13},{"media":9.37,"nr":9}]},{"nume":"Matematică-Informatică (bilingv engleză, cu examen)","total":26,"prag":9.45,"max":9.57,"medie":9.482,"densitatePrag":26,"densitatePragPct":100.0,"distributie":[{"media":9.57,"nr":1},{"media":9.55,"nr":1},{"media":9.52,"nr":2},{"media":9.5,"nr":6},{"media":9.47,"nr":8},{"media":9.45,"nr":8}]},{"nume":"Ştiinţe ale Naturii","total":52,"prag":9.35,"max":9.77,"medie":9.42,"densitatePrag":51,"densitatePragPct":98.1,"distributie":[{"media":9.77,"nr":1},{"media":9.52,"nr":2},{"media":9.5,"nr":2},{"media":9.47,"nr":8},{"media":9.45,"nr":6},{"media":9.42,"nr":4},{"media":9.4,"nr":12},{"media":9.37,"nr":8},{"media":9.35,"nr":9}]},{"nume":"Ştiinţe Sociale","total":26,"prag":9.27,"max":9.5,"medie":9.354,"densitatePrag":25,"densitatePragPct":96.2,"distributie":[{"media":9.5,"nr":1},{"media":9.47,"nr":1},{"media":9.45,"nr":3},{"media":9.42,"nr":1},{"media":9.37,"nr":4},{"media":9.35,"nr":2},{"media":9.32,"nr":6},{"media":9.3,"nr":7},{"media":9.27,"nr":1}]},{"nume":"Filologie","total":52,"prag":9.2,"max":9.87,"medie":9.269,"densitatePrag":46,"densitatePragPct":88.5,"distributie":[{"media":9.87,"nr":1},{"media":9.82,"nr":1},{"media":9.5,"nr":1},{"media":9.47,"nr":1},{"media":9.45,"nr":2},{"media":9.32,"nr":1},{"media":9.27,"nr":7},{"media":9.25,"nr":8},{"media":9.22,"nr":11},{"media":9.21,"nr":1},{"media":9.2,"nr":18}]}]},{"rank":13,"cod":"4061103455","nume":"Colegiul Național „Cantemir Vodă”","specializari":[{"nume":"Ştiinţe ale Naturii","total":52,"prag":9.37,"max":9.67,"medie":9.447,"densitatePrag":49,"densitatePragPct":94.2,"distributie":[{"media":9.67,"nr":1},{"media":9.6,"nr":2},{"media":9.57,"nr":2},{"media":9.55,"nr":1},{"media":9.52,"nr":2},{"media":9.5,"nr":1},{"media":9.47,"nr":5},{"media":9.45,"nr":11},{"media":9.42,"nr":11},{"media":9.4,"nr":11},{"media":9.37,"nr":5}]},{"nume":"Matematică-Informatică","total":104,"prag":9.35,"max":9.65,"medie":9.419,"densitatePrag":98,"densitatePragPct":94.2,"distributie":[{"media":9.65,"nr":1},{"media":9.62,"nr":1},{"media":9.6,"nr":3},{"media":9.57,"nr":1},{"media":9.55,"nr":3},{"media":9.52,"nr":2},{"media":9.5,"nr":3},{"media":9.47,"nr":9},{"media":9.45,"nr":8},{"media":9.42,"nr":14},{"media":9.4,"nr":14},{"media":9.37,"nr":34},{"media":9.35,"nr":11}]},{"nume":"Matematică-Informatică (bilingv engleză, cu examen)","total":26,"prag":9.55,"max":9.85,"medie":9.657,"densitatePrag":24,"densitatePragPct":92.3,"distributie":[{"media":9.85,"nr":1},{"media":9.77,"nr":1},{"media":9.75,"nr":1},{"media":9.72,"nr":2},{"media":9.7,"nr":3},{"media":9.67,"nr":2},{"media":9.65,"nr":5},{"media":9.62,"nr":5},{"media":9.6,"nr":3},{"media":9.57,"nr":2},{"media":9.55,"nr":1}]}]},{"rank":14,"cod":"4061100167","nume":"Colegiul Naţional „Elena Cuza”","specializari":[{"nume":"Matematică-Informatică","total":52,"prag":9.32,"max":9.72,"medie":9.445,"densitatePrag":47,"densitatePragPct":90.4,"distributie":[{"media":9.72,"nr":1},{"media":9.7,"nr":1},{"media":9.65,"nr":1},{"media":9.62,"nr":1},{"media":9.57,"nr":1},{"media":9.52,"nr":2},{"media":9.5,"nr":5},{"media":9.47,"nr":6},{"media":9.45,"nr":7},{"media":9.42,"nr":6},{"media":9.4,"nr":10},{"media":9.37,"nr":3},{"media":9.35,"nr":6},{"media":9.32,"nr":2}]},{"nume":"Filologie (bilingv engleză, cu examen)","total":26,"prag":9.1,"max":9.4,"medie":9.178,"densitatePrag":24,"densitatePragPct":92.3,"distributie":[{"media":9.4,"nr":1},{"media":9.32,"nr":1},{"media":9.3,"nr":2},{"media":9.25,"nr":2},{"media":9.22,"nr":1},{"media":9.2,"nr":3},{"media":9.17,"nr":2},{"media":9.15,"nr":4},{"media":9.12,"nr":2},{"media":9.1,"nr":8}]},{"nume":"Filologie","total":26,"prag":9.07,"max":9.42,"medie":9.184,"densitatePrag":21,"densitatePragPct":80.8,"distributie":[{"media":9.42,"nr":1},{"media":9.4,"nr":1},{"media":9.37,"nr":1},{"media":9.32,"nr":1},{"media":9.3,"nr":1},{"media":9.27,"nr":1},{"media":9.25,"nr":2},{"media":9.22,"nr":1},{"media":9.2,"nr":1},{"media":9.17,"nr":2},{"media":9.15,"nr":1},{"media":9.12,"nr":6},{"media":9.1,"nr":3},{"media":9.07,"nr":4}]}]},{"rank":15,"cod":"4061101774","nume":"Liceul Teoretic „Nicolae Iorga”","specializari":[{"nume":"Matematică-Informatică","total":52,"prag":9.3,"max":9.65,"medie":9.378,"densitatePrag":49,"densitatePragPct":94.2,"distributie":[{"media":9.65,"nr":1},{"media":9.55,"nr":2},{"media":9.47,"nr":3},{"media":9.45,"nr":4},{"media":9.42,"nr":4},{"media":9.4,"nr":5},{"media":9.37,"nr":6},{"media":9.35,"nr":10},{"media":9.32,"nr":9},{"media":9.3,"nr":8}]},{"nume":"Ştiinţe ale Naturii","total":26,"prag":9.27,"max":9.55,"medie":9.312,"densitatePrag":25,"densitatePragPct":96.2,"distributie":[{"media":9.55,"nr":1},{"media":9.47,"nr":1},{"media":9.45,"nr":1},{"media":9.37,"nr":1},{"media":9.35,"nr":2},{"media":9.3,"nr":6},{"media":9.27,"nr":14}]},{"nume":"Ştiinţe ale Naturii (bilingv engleză, cu examen)","total":26,"prag":9.3,"max":9.65,"medie":9.37,"densitatePrag":24,"densitatePragPct":92.3,"distributie":[{"media":9.65,"nr":1},{"media":9.6,"nr":1},{"media":9.5,"nr":1},{"media":9.42,"nr":2},{"media":9.4,"nr":1},{"media":9.37,"nr":4},{"media":9.35,"nr":3},{"media":9.32,"nr":10},{"media":9.3,"nr":3}]},{"nume":"Ştiinţe Sociale","total":26,"prag":9.17,"max":9.3,"medie":9.211,"densitatePrag":26,"densitatePragPct":100.0,"distributie":[{"media":9.3,"nr":1},{"media":9.27,"nr":1},{"media":9.25,"nr":5},{"media":9.22,"nr":5},{"media":9.2,"nr":6},{"media":9.17,"nr":8}]},{"nume":"Filologie","total":26,"prag":9.12,"max":9.3,"medie":9.14,"densitatePrag":26,"densitatePragPct":100.0,"distributie":[{"media":9.3,"nr":1},{"media":9.17,"nr":4},{"media":9.15,"nr":5},{"media":9.12,"nr":16}]}]},{"rank":16,"cod":"4061103274","nume":"Colegiul Naţional „Mihai Eminescu”","specializari":[{"nume":"Ştiinţe ale Naturii","total":52,"prag":9.27,"max":9.75,"medie":9.367,"densitatePrag":47,"densitatePragPct":90.4,"distributie":[{"media":9.75,"nr":1},{"media":9.65,"nr":1},{"media":9.57,"nr":1},{"media":9.55,"nr":2},{"media":9.47,"nr":1},{"media":9.45,"nr":5},{"media":9.42,"nr":3},{"media":9.4,"nr":1},{"media":9.37,"nr":3},{"media":9.35,"nr":7},{"media":9.32,"nr":11},{"media":9.3,"nr":7},{"media":9.27,"nr":9}]},{"nume":"Matematică-Informatică","total":104,"prag":9.25,"max":9.82,"medie":9.313,"densitatePrag":100,"densitatePragPct":96.2,"distributie":[{"media":9.82,"nr":1},{"media":9.5,"nr":3},{"media":9.45,"nr":1},{"media":9.42,"nr":2},{"media":9.4,"nr":3},{"media":9.37,"nr":4},{"media":9.35,"nr":8},{"media":9.32,"nr":22},{"media":9.31,"nr":1},{"media":9.3,"nr":19},{"media":9.27,"nr":23},{"media":9.25,"nr":17}]},{"nume":"Ştiinţe Sociale","total":52,"prag":9.17,"max":9.4,"medie":9.239,"densitatePrag":49,"densitatePragPct":94.2,"distributie":[{"media":9.4,"nr":3},{"media":9.37,"nr":1},{"media":9.3,"nr":4},{"media":9.27,"nr":4},{"media":9.25,"nr":9},{"media":9.22,"nr":15},{"media":9.2,"nr":11},{"media":9.17,"nr":5}]},{"nume":"Filologie","total":52,"prag":9.15,"max":9.4,"medie":9.177,"densitatePrag":51,"densitatePragPct":98.1,"distributie":[{"media":9.4,"nr":1},{"media":9.35,"nr":1},{"media":9.25,"nr":3},{"media":9.2,"nr":5},{"media":9.17,"nr":19},{"media":9.15,"nr":23}]}]},{"rank":17,"cod":"4061102576","nume":"Liceul Teoretic „Alexandru Ioan Cuza”","specializari":[{"nume":"Ştiinţe ale Naturii","total":52,"prag":9.25,"max":9.57,"medie":9.34,"densitatePrag":46,"densitatePragPct":88.5,"distributie":[{"media":9.57,"nr":2},{"media":9.55,"nr":1},{"media":9.52,"nr":1},{"media":9.48,"nr":1},{"media":9.47,"nr":1},{"media":9.42,"nr":2},{"media":9.41,"nr":1},{"media":9.4,"nr":2},{"media":9.37,"nr":3},{"media":9.35,"nr":4},{"media":9.32,"nr":11},{"media":9.3,"nr":9},{"media":9.27,"nr":12},{"media":9.25,"nr":2}]},{"nume":"Matematică-Informatică","total":130,"prag":9.22,"max":9.87,"medie":9.341,"densitatePrag":107,"densitatePragPct":82.3,"distributie":[{"media":9.87,"nr":1},{"media":9.77,"nr":1},{"media":9.72,"nr":1},{"media":9.62,"nr":3},{"media":9.6,"nr":2},{"media":9.57,"nr":1},{"media":9.55,"nr":5},{"media":9.52,"nr":5},{"media":9.5,"nr":1},{"media":9.47,"nr":1},{"media":9.45,"nr":2},{"media":9.42,"nr":6},{"media":9.4,"nr":3},{"media":9.37,"nr":4},{"media":9.35,"nr":5},{"media":9.32,"nr":16},{"media":9.3,"nr":17},{"media":9.27,"nr":20},{"media":9.25,"nr":20},{"media":9.22,"nr":16}]},{"nume":"Ştiinţe Sociale","total":52,"prag":9.12,"max":9.62,"medie":9.204,"densitatePrag":49,"densitatePragPct":94.2,"distributie":[{"media":9.62,"nr":1},{"media":9.45,"nr":1},{"media":9.35,"nr":1},{"media":9.32,"nr":2},{"media":9.3,"nr":1},{"media":9.27,"nr":3},{"media":9.25,"nr":3},{"media":9.22,"nr":2},{"media":9.2,"nr":8},{"media":9.17,"nr":14},{"media":9.15,"nr":12},{"media":9.12,"nr":4}]}]},{"rank":18,"cod":"4061102201","nume":"Colegiul Național „Ion Neculce”","specializari":[{"nume":"Matematică-Informatică","total":78,"prag":9.22,"max":9.55,"medie":9.277,"densitatePrag":74,"densitatePragPct":94.9,"distributie":[{"media":9.55,"nr":1},{"media":9.47,"nr":1},{"media":9.45,"nr":2},{"media":9.42,"nr":1},{"media":9.4,"nr":3},{"media":9.37,"nr":1},{"media":9.35,"nr":3},{"media":9.32,"nr":6},{"media":9.3,"nr":6},{"media":9.27,"nr":10},{"media":9.25,"nr":18},{"media":9.23,"nr":1},{"media":9.22,"nr":25}]},{"nume":"Ştiinţe ale Naturii","total":26,"prag":9.25,"max":9.9,"medie":9.392,"densitatePrag":21,"densitatePragPct":80.8,"distributie":[{"media":9.9,"nr":2},{"media":9.57,"nr":1},{"media":9.55,"nr":1},{"media":9.52,"nr":1},{"media":9.45,"nr":3},{"media":9.4,"nr":1},{"media":9.37,"nr":1},{"media":9.35,"nr":1},{"media":9.32,"nr":5},{"media":9.3,"nr":3},{"media":9.27,"nr":1},{"media":9.25,"nr":6}]},{"nume":"Ştiinţe ale Naturii (bilingv italiană, fără examen)","total":26,"prag":9.17,"max":9.67,"medie":9.272,"densitatePrag":23,"densitatePragPct":88.5,"distributie":[{"media":9.67,"nr":1},{"media":9.65,"nr":1},{"media":9.5,"nr":1},{"media":9.37,"nr":1},{"media":9.35,"nr":1},{"media":9.25,"nr":5},{"media":9.22,"nr":5},{"media":9.2,"nr":10},{"media":9.17,"nr":1}]},{"nume":"Ştiinţe Sociale","total":26,"prag":9.12,"max":9.5,"medie":9.197,"densitatePrag":24,"densitatePragPct":92.3,"distributie":[{"media":9.5,"nr":1},{"media":9.4,"nr":1},{"media":9.32,"nr":1},{"media":9.27,"nr":1},{"media":9.22,"nr":2},{"media":9.2,"nr":1},{"media":9.17,"nr":8},{"media":9.15,"nr":10},{"media":9.12,"nr":1}]},{"nume":"Filologie","total":26,"prag":9.1,"max":9.47,"medie":9.145,"densitatePrag":24,"densitatePragPct":92.3,"distributie":[{"media":9.47,"nr":1},{"media":9.4,"nr":1},{"media":9.17,"nr":2},{"media":9.15,"nr":5},{"media":9.12,"nr":5},{"media":9.1,"nr":12}]},{"nume":"Filologie (bilingv italiană, fără examen)","total":26,"prag":9.05,"max":9.6,"medie":9.113,"densitatePrag":25,"densitatePragPct":96.2,"distributie":[{"media":9.6,"nr":1},{"media":9.22,"nr":1},{"media":9.17,"nr":1},{"media":9.13,"nr":1},{"media":9.12,"nr":2},{"media":9.1,"nr":7},{"media":9.07,"nr":11},{"media":9.05,"nr":2}]}]},{"rank":19,"cod":"4061101209","nume":"Liceul Teoretic „Jean Monnet”","specializari":[{"nume":"Matematică-Informatică","total":52,"prag":9.15,"max":9.65,"medie":9.272,"densitatePrag":41,"densitatePragPct":78.8,"distributie":[{"media":9.65,"nr":1},{"media":9.62,"nr":2},{"media":9.52,"nr":1},{"media":9.5,"nr":1},{"media":9.47,"nr":1},{"media":9.45,"nr":2},{"media":9.42,"nr":2},{"media":9.37,"nr":1},{"media":9.35,"nr":3},{"media":9.3,"nr":1},{"media":9.27,"nr":2},{"media":9.25,"nr":6},{"media":9.22,"nr":5},{"media":9.2,"nr":7},{"media":9.17,"nr":11},{"media":9.15,"nr":6}]},{"nume":"Ştiinţe ale Naturii","total":52,"prag":9.1,"max":9.67,"medie":9.156,"densitatePrag":50,"densitatePragPct":96.2,"distributie":[{"media":9.67,"nr":1},{"media":9.37,"nr":1},{"media":9.27,"nr":2},{"media":9.25,"nr":1},{"media":9.2,"nr":3},{"media":9.17,"nr":7},{"media":9.15,"nr":8},{"media":9.12,"nr":19},{"media":9.1,"nr":10}]},{"nume":"Ştiinţe Sociale","total":52,"prag":9.02,"max":9.4,"medie":9.084,"densitatePrag":49,"densitatePragPct":94.2,"distributie":[{"media":9.4,"nr":1},{"media":9.32,"nr":1},{"media":9.25,"nr":1},{"media":9.22,"nr":2},{"media":9.2,"nr":2},{"media":9.15,"nr":1},{"media":9.1,"nr":8},{"media":9.07,"nr":11},{"media":9.05,"nr":12},{"media":9.02,"nr":13}]}]},{"rank":20,"cod":"4061101887","nume":"Liceul Teoretic „Ion Barbu”","specializari":[{"nume":"Matematică-Informatică","total":52,"prag":9.1,"max":9.45,"medie":9.172,"densitatePrag":48,"densitatePragPct":92.3,"distributie":[{"media":9.45,"nr":2},{"media":9.32,"nr":2},{"media":9.27,"nr":1},{"media":9.25,"nr":4},{"media":9.22,"nr":3},{"media":9.2,"nr":1},{"media":9.17,"nr":9},{"media":9.15,"nr":10},{"media":9.12,"nr":11},{"media":9.1,"nr":9}]},{"nume":"Ştiinţe ale Naturii","total":52,"prag":9.05,"max":9.27,"medie":9.131,"densitatePrag":50,"densitatePragPct":96.2,"distributie":[{"media":9.27,"nr":2},{"media":9.25,"nr":1},{"media":9.22,"nr":3},{"media":9.2,"nr":8},{"media":9.17,"nr":6},{"media":9.15,"nr":5},{"media":9.12,"nr":2},{"media":9.1,"nr":6},{"media":9.07,"nr":11},{"media":9.05,"nr":8}]},{"nume":"Ştiinţe Sociale","total":78,"prag":8.92,"max":9.37,"medie":8.982,"densitatePrag":75,"densitatePragPct":96.2,"distributie":[{"media":9.37,"nr":1},{"media":9.17,"nr":2},{"media":9.1,"nr":2},{"media":9.07,"nr":5},{"media":9.05,"nr":2},{"media":9.02,"nr":4},{"media":9.0,"nr":13},{"media":8.97,"nr":13},{"media":8.95,"nr":14},{"media":8.92,"nr":22}]}]},{"rank":21,"cod":"4061101385","nume":"Colegiul German „Goethe”","specializari":[{"nume":"Teor.real spec.germană","total":25,"prag":9.08,"max":9.86,"medie":9.447,"densitatePrag":5,"densitatePragPct":20.0,"distributie":[{"media":9.86,"nr":1},{"media":9.7,"nr":1},{"media":9.68,"nr":1},{"media":9.65,"nr":1},{"media":9.61,"nr":1},{"media":9.6,"nr":1},{"media":9.58,"nr":1},{"media":9.51,"nr":1},{"media":9.5,"nr":2},{"media":9.46,"nr":1},{"media":9.43,"nr":1},{"media":9.41,"nr":3},{"media":9.38,"nr":3},{"media":9.36,"nr":1},{"media":9.35,"nr":1},{"media":9.28,"nr":2},{"media":9.26,"nr":1},{"media":9.11,"nr":1},{"media":9.08,"nr":1}]},{"nume":"Teor.uman.spec.germană","total":25,"prag":8.9,"max":9.68,"medie":9.177,"densitatePrag":11,"densitatePragPct":44.0,"distributie":[{"media":9.68,"nr":1},{"media":9.6,"nr":1},{"media":9.53,"nr":1},{"media":9.41,"nr":1},{"media":9.35,"nr":1},{"media":9.33,"nr":1},{"media":9.31,"nr":1},{"media":9.26,"nr":1},{"media":9.25,"nr":2},{"media":9.21,"nr":1},{"media":9.2,"nr":1},{"media":9.18,"nr":1},{"media":9.11,"nr":1},{"media":9.1,"nr":1},{"media":9.05,"nr":1},{"media":9.01,"nr":2},{"media":9.0,"nr":2},{"media":8.95,"nr":1},{"media":8.93,"nr":1},{"media":8.91,"nr":1},{"media":8.9,"nr":2}]},{"nume":"Matematică-Informatică","total":26,"prag":8.46,"max":9.58,"medie":8.771,"densitatePrag":13,"densitatePragPct":50.0,"distributie":[{"media":9.58,"nr":1},{"media":9.41,"nr":1},{"media":9.23,"nr":1},{"media":9.1,"nr":1},{"media":9.0,"nr":1},{"media":8.9,"nr":1},{"media":8.88,"nr":1},{"media":8.86,"nr":1},{"media":8.85,"nr":1},{"media":8.78,"nr":1},{"media":8.76,"nr":1},{"media":8.73,"nr":1},{"media":8.7,"nr":1},{"media":8.66,"nr":1},{"media":8.65,"nr":1},{"media":8.63,"nr":1},{"media":8.61,"nr":2},{"media":8.58,"nr":2},{"media":8.51,"nr":3},{"media":8.48,"nr":2},{"media":8.46,"nr":1}]},{"nume":"Filologie","total":37,"prag":3.96,"max":9.15,"medie":7.679,"densitatePrag":1,"densitatePragPct":2.7,"distributie":[{"media":9.15,"nr":1},{"media":9.03,"nr":1},{"media":8.75,"nr":1},{"media":8.7,"nr":1},{"media":8.58,"nr":1},{"media":8.56,"nr":1},{"media":8.51,"nr":1},{"media":8.45,"nr":1},{"media":8.38,"nr":2},{"media":8.3,"nr":1},{"media":8.21,"nr":1},{"media":8.2,"nr":1},{"media":8.13,"nr":1},{"media":7.93,"nr":1},{"media":7.91,"nr":1},{"media":7.9,"nr":2},{"media":7.76,"nr":1},{"media":7.73,"nr":1},{"media":7.71,"nr":1},{"media":7.61,"nr":2},{"media":7.53,"nr":1},{"media":7.5,"nr":1},{"media":7.41,"nr":2},{"media":7.31,"nr":1},{"media":7.3,"nr":1},{"media":7.21,"nr":1},{"media":7.06,"nr":1},{"media":7.03,"nr":1},{"media":6.93,"nr":1},{"media":6.83,"nr":1},{"media":6.31,"nr":1},{"media":4.95,"nr":1},{"media":3.96,"nr":1}]}]},{"rank":22,"cod":"4061100158","nume":"Liceul Teoretic „C.A. Rosetti”","specializari":[{"nume":"Matematică-Informatică","total":78,"prag":9.02,"max":9.42,"medie":9.114,"densitatePrag":69,"densitatePragPct":88.5,"distributie":[{"media":9.42,"nr":1},{"media":9.35,"nr":1},{"media":9.32,"nr":2},{"media":9.3,"nr":3},{"media":9.27,"nr":1},{"media":9.25,"nr":1},{"media":9.2,"nr":1},{"media":9.17,"nr":5},{"media":9.15,"nr":9},{"media":9.12,"nr":4},{"media":9.1,"nr":9},{"media":9.07,"nr":18},{"media":9.05,"nr":19},{"media":9.02,"nr":4}]},{"nume":"Filologie","total":26,"prag":8.97,"max":9.27,"medie":9.007,"densitatePrag":25,"densitatePragPct":96.2,"distributie":[{"media":9.27,"nr":1},{"media":9.07,"nr":1},{"media":9.05,"nr":2},{"media":9.02,"nr":3},{"media":9.0,"nr":8},{"media":8.97,"nr":11}]},{"nume":"Ştiinţe ale Naturii","total":78,"prag":8.97,"max":9.4,"medie":9.072,"densitatePrag":69,"densitatePragPct":88.5,"distributie":[{"media":9.4,"nr":1},{"media":9.32,"nr":1},{"media":9.3,"nr":2},{"media":9.27,"nr":1},{"media":9.25,"nr":2},{"media":9.2,"nr":2},{"media":9.17,"nr":3},{"media":9.15,"nr":3},{"media":9.12,"nr":8},{"media":9.1,"nr":2},{"media":9.07,"nr":10},{"media":9.05,"nr":9},{"media":9.02,"nr":8},{"media":9.0,"nr":17},{"media":8.97,"nr":9}]}]},{"rank":23,"cod":"4061103179","nume":"Colegiul Național „Tudor Vladimirescu”","specializari":[{"nume":"Matematică-Informatică","total":52,"prag":9.02,"max":9.72,"medie":9.131,"densitatePrag":47,"densitatePragPct":90.4,"distributie":[{"media":9.72,"nr":1},{"media":9.4,"nr":2},{"media":9.27,"nr":2},{"media":9.22,"nr":1},{"media":9.2,"nr":5},{"media":9.17,"nr":4},{"media":9.15,"nr":3},{"media":9.12,"nr":4},{"media":9.1,"nr":7},{"media":9.07,"nr":9},{"media":9.05,"nr":10},{"media":9.02,"nr":4}]},{"nume":"Ştiinţe ale Naturii","total":52,"prag":8.95,"max":9.4,"medie":9.047,"densitatePrag":45,"densitatePragPct":86.5,"distributie":[{"media":9.4,"nr":1},{"media":9.35,"nr":1},{"media":9.32,"nr":2},{"media":9.3,"nr":1},{"media":9.27,"nr":1},{"media":9.2,"nr":1},{"media":9.15,"nr":1},{"media":9.12,"nr":1},{"media":9.1,"nr":4},{"media":9.07,"nr":2},{"media":9.05,"nr":1},{"media":9.02,"nr":7},{"media":9.0,"nr":10},{"media":8.97,"nr":11},{"media":8.95,"nr":8}]},{"nume":"Filologie","total":26,"prag":8.87,"max":9.3,"medie":8.952,"densitatePrag":24,"densitatePragPct":92.3,"distributie":[{"media":9.3,"nr":1},{"media":9.15,"nr":1},{"media":9.07,"nr":1},{"media":9.02,"nr":1},{"media":9.0,"nr":1},{"media":8.97,"nr":2},{"media":8.95,"nr":3},{"media":8.92,"nr":6},{"media":8.9,"nr":7},{"media":8.87,"nr":3}]},{"nume":"Ştiinţe Sociale","total":78,"prag":8.8,"max":9.4,"medie":8.899,"densitatePrag":67,"densitatePragPct":85.9,"distributie":[{"media":9.4,"nr":1},{"media":9.22,"nr":1},{"media":9.2,"nr":1},{"media":9.12,"nr":1},{"media":9.1,"nr":1},{"media":9.07,"nr":3},{"media":9.05,"nr":1},{"media":9.02,"nr":2},{"media":9.0,"nr":1},{"media":8.97,"nr":4},{"media":8.95,"nr":6},{"media":8.92,"nr":4},{"media":8.9,"nr":5},{"media":8.87,"nr":8},{"media":8.85,"nr":10},{"media":8.82,"nr":18},{"media":8.8,"nr":11}]}]},{"rank":24,"cod":"4061103075","nume":"Liceul Teoretic „George Călinescu”","specializari":[{"nume":"Matematică-Informatică","total":78,"prag":9.0,"max":9.2,"medie":9.077,"densitatePrag":78,"densitatePragPct":100.0,"distributie":[{"media":9.2,"nr":3},{"media":9.17,"nr":3},{"media":9.15,"nr":7},{"media":9.12,"nr":13},{"media":9.1,"nr":11},{"media":9.07,"nr":5},{"media":9.05,"nr":11},{"media":9.02,"nr":16},{"media":9.0,"nr":9}]},{"nume":"Filologie","total":78,"prag":8.87,"max":9.07,"medie":8.927,"densitatePrag":78,"densitatePragPct":100.0,"distributie":[{"media":9.07,"nr":2},{"media":9.05,"nr":2},{"media":9.02,"nr":2},{"media":9.0,"nr":2},{"media":8.97,"nr":10},{"media":8.95,"nr":14},{"media":8.92,"nr":13},{"media":8.9,"nr":13},{"media":8.87,"nr":20}]}]},{"rank":25,"cod":"4061101046","nume":"Colegiul Economic „Virgil Madgearu”","specializari":[{"nume":"Turism şi alimentaţie","total":24,"prag":8.97,"max":9.52,"medie":9.098,"densitatePrag":21,"densitatePragPct":87.5,"distributie":[{"media":9.52,"nr":1},{"media":9.47,"nr":1},{"media":9.35,"nr":1},{"media":9.17,"nr":3},{"media":9.15,"nr":2},{"media":9.1,"nr":1},{"media":9.07,"nr":1},{"media":9.05,"nr":2},{"media":9.02,"nr":3},{"media":9.0,"nr":5},{"media":8.97,"nr":4}]},{"nume":"Economic","total":216,"prag":8.8,"max":9.65,"medie":8.968,"densitatePrag":156,"densitatePragPct":72.2,"distributie":[{"media":9.65,"nr":1},{"media":9.62,"nr":1},{"media":9.57,"nr":1},{"media":9.47,"nr":2},{"media":9.4,"nr":1},{"media":9.37,"nr":1},{"media":9.35,"nr":3},{"media":9.32,"nr":4},{"media":9.27,"nr":1},{"media":9.25,"nr":3},{"media":9.22,"nr":3},{"media":9.2,"nr":1},{"media":9.17,"nr":1},{"media":9.15,"nr":3},{"media":9.12,"nr":5},{"media":9.1,"nr":6},{"media":9.07,"nr":4},{"media":9.05,"nr":8},{"media":9.02,"nr":11},{"media":9.0,"nr":10},{"media":8.97,"nr":14},{"media":8.95,"nr":20},{"media":8.92,"nr":16},{"media":8.9,"nr":20},{"media":8.87,"nr":15},{"media":8.85,"nr":19},{"media":8.82,"nr":30},{"media":8.8,"nr":12}]}]},{"rank":26,"cod":"4061100556","nume":"Colegiul Național „Emil Racoviță”","specializari":[{"nume":"Matematică-Informatică","total":26,"prag":8.95,"max":9.15,"medie":8.999,"densitatePrag":26,"densitatePragPct":100.0,"distributie":[{"media":9.15,"nr":1},{"media":9.1,"nr":2},{"media":9.05,"nr":2},{"media":9.02,"nr":4},{"media":9.0,"nr":4},{"media":8.97,"nr":5},{"media":8.95,"nr":8}]},{"nume":"Filologie","total":78,"prag":8.7,"max":9.17,"medie":8.795,"densitatePrag":67,"densitatePragPct":85.9,"distributie":[{"media":9.17,"nr":1},{"media":9.12,"nr":2},{"media":9.1,"nr":1},{"media":9.0,"nr":2},{"media":8.95,"nr":3},{"media":8.92,"nr":2},{"media":8.87,"nr":2},{"media":8.85,"nr":2},{"media":8.82,"nr":10},{"media":8.8,"nr":4},{"media":8.77,"nr":9},{"media":8.75,"nr":15},{"media":8.72,"nr":16},{"media":8.7,"nr":9}]}]},{"rank":27,"cod":"4061104022","nume":"Colegiul Național „Școala Centrală”","specializari":[{"nume":"Matematică-Informatică","total":104,"prag":9.2,"max":9.5,"medie":9.249,"densitatePrag":102,"densitatePragPct":98.1,"distributie":[{"media":9.5,"nr":1},{"media":9.47,"nr":1},{"media":9.37,"nr":1},{"media":9.35,"nr":4},{"media":9.32,"nr":10},{"media":9.3,"nr":7},{"media":9.27,"nr":10},{"media":9.25,"nr":15},{"media":9.22,"nr":19},{"media":9.2,"nr":36}]},{"nume":"Matematică-Informatică (bilingv franceză, cu examen)","total":26,"prag":8.95,"max":9.52,"medie":9.144,"densitatePrag":18,"densitatePragPct":69.2,"distributie":[{"media":9.52,"nr":1},{"media":9.45,"nr":2},{"media":9.42,"nr":1},{"media":9.37,"nr":1},{"media":9.3,"nr":1},{"media":9.22,"nr":1},{"media":9.17,"nr":1},{"media":9.12,"nr":5},{"media":9.07,"nr":3},{"media":9.05,"nr":3},{"media":9.02,"nr":1},{"media":9.0,"nr":2},{"media":8.97,"nr":3},{"media":8.95,"nr":1}]},{"nume":"Matematică-Informatică (bilingv franceză, fără examen)","total":26,"prag":9.15,"max":9.32,"medie":9.188,"densitatePrag":26,"densitatePragPct":100.0,"distributie":[{"media":9.32,"nr":1},{"media":9.27,"nr":1},{"media":9.25,"nr":2},{"media":9.22,"nr":2},{"media":9.2,"nr":3},{"media":9.17,"nr":11},{"media":9.15,"nr":6}]},{"nume":"Filologie","total":78,"prag":9.02,"max":9.3,"medie":9.102,"densitatePrag":74,"densitatePragPct":94.9,"distributie":[{"media":9.3,"nr":2},{"media":9.25,"nr":2},{"media":9.22,"nr":2},{"media":9.2,"nr":1},{"media":9.17,"nr":4},{"media":9.15,"nr":5},{"media":9.12,"nr":10},{"media":9.1,"nr":15},{"media":9.07,"nr":18},{"media":9.05,"nr":16},{"media":9.02,"nr":3}]},{"nume":"Filologie (bilingv franceză, cu examen)","total":26,"prag":8.75,"max":9.3,"medie":8.922,"densitatePrag":19,"densitatePragPct":73.1,"distributie":[{"media":9.3,"nr":1},{"media":9.22,"nr":1},{"media":9.2,"nr":1},{"media":9.15,"nr":1},{"media":9.1,"nr":1},{"media":9.05,"nr":1},{"media":8.97,"nr":1},{"media":8.95,"nr":1},{"media":8.92,"nr":4},{"media":8.87,"nr":1},{"media":8.85,"nr":4},{"media":8.82,"nr":2},{"media":8.8,"nr":3},{"media":8.77,"nr":2},{"media":8.75,"nr":2}]},{"nume":"Filologie (bilingv franceză, fără examen)","total":26,"prag":9.0,"max":9.5,"medie":9.064,"densitatePrag":25,"densitatePragPct":96.2,"distributie":[{"media":9.5,"nr":1},{"media":9.15,"nr":3},{"media":9.12,"nr":1},{"media":9.1,"nr":2},{"media":9.07,"nr":1},{"media":9.05,"nr":2},{"media":9.02,"nr":11},{"media":9.0,"nr":5}]}]},{"rank":28,"cod":"4061102454","nume":"Colegiul Național „Victor Babeș”","specializari":[{"nume":"Matematică-Informatică","total":26,"prag":8.85,"max":9.1,"medie":8.91,"densitatePrag":25,"densitatePragPct":96.2,"distributie":[{"media":9.1,"nr":1},{"media":8.97,"nr":3},{"media":8.95,"nr":2},{"media":8.92,"nr":4},{"media":8.9,"nr":7},{"media":8.87,"nr":6},{"media":8.85,"nr":3}]},{"nume":"Filologie","total":26,"prag":8.52,"max":9.1,"medie":8.63,"densitatePrag":23,"densitatePragPct":88.5,"distributie":[{"media":9.1,"nr":1},{"media":8.95,"nr":1},{"media":8.75,"nr":1},{"media":8.72,"nr":2},{"media":8.65,"nr":4},{"media":8.62,"nr":2},{"media":8.6,"nr":2},{"media":8.57,"nr":4},{"media":8.55,"nr":5},{"media":8.52,"nr":4}]},{"nume":"Ştiinţe Sociale","total":26,"prag":8.5,"max":8.95,"medie":8.642,"densitatePrag":19,"densitatePragPct":73.1,"distributie":[{"media":8.95,"nr":1},{"media":8.9,"nr":1},{"media":8.87,"nr":1},{"media":8.82,"nr":2},{"media":8.8,"nr":1},{"media":8.72,"nr":1},{"media":8.7,"nr":1},{"media":8.67,"nr":1},{"media":8.65,"nr":1},{"media":8.62,"nr":3},{"media":8.6,"nr":1},{"media":8.57,"nr":4},{"media":8.52,"nr":3},{"media":8.5,"nr":5}]},{"nume":"Ştiinţe ale Naturii","total":104,"prag":8.47,"max":9.35,"medie":8.677,"densitatePrag":61,"densitatePragPct":58.7,"distributie":[{"media":9.35,"nr":2},{"media":9.2,"nr":1},{"media":9.1,"nr":1},{"media":9.05,"nr":1},{"media":8.97,"nr":1},{"media":8.92,"nr":2},{"media":8.87,"nr":2},{"media":8.85,"nr":3},{"media":8.82,"nr":5},{"media":8.8,"nr":3},{"media":8.77,"nr":3},{"media":8.75,"nr":7},{"media":8.72,"nr":3},{"media":8.7,"nr":9},{"media":8.67,"nr":8},{"media":8.65,"nr":7},{"media":8.62,"nr":2},{"media":8.6,"nr":7},{"media":8.57,"nr":7},{"media":8.55,"nr":9},{"media":8.52,"nr":5},{"media":8.5,"nr":11},{"media":8.47,"nr":5}]}]},{"rank":29,"cod":"4061101557","nume":"Liceul Teoretic „Ștefan Odobleja”","specializari":[{"nume":"Ştiinţe ale Naturii","total":26,"prag":8.82,"max":9.22,"medie":8.921,"densitatePrag":24,"densitatePragPct":92.3,"distributie":[{"media":9.22,"nr":1},{"media":9.1,"nr":1},{"media":9.02,"nr":3},{"media":8.97,"nr":1},{"media":8.92,"nr":4},{"media":8.9,"nr":6},{"media":8.87,"nr":5},{"media":8.85,"nr":2},{"media":8.82,"nr":3}]},{"nume":"Ştiinţe Sociale","total":26,"prag":8.67,"max":8.9,"medie":8.748,"densitatePrag":25,"densitatePragPct":96.2,"distributie":[{"media":8.9,"nr":1},{"media":8.85,"nr":1},{"media":8.82,"nr":4},{"media":8.77,"nr":1},{"media":8.75,"nr":6},{"media":8.72,"nr":5},{"media":8.7,"nr":6},{"media":8.67,"nr":2}]},{"nume":"Matematică-Informatică","total":78,"prag":8.65,"max":9.4,"medie":8.828,"densitatePrag":48,"densitatePragPct":61.5,"distributie":[{"media":9.4,"nr":1},{"media":9.37,"nr":1},{"media":9.1,"nr":1},{"media":9.07,"nr":1},{"media":9.05,"nr":2},{"media":9.02,"nr":1},{"media":8.97,"nr":3},{"media":8.95,"nr":2},{"media":8.92,"nr":3},{"media":8.9,"nr":11},{"media":8.87,"nr":4},{"media":8.85,"nr":4},{"media":8.82,"nr":4},{"media":8.8,"nr":5},{"media":8.77,"nr":2},{"media":8.75,"nr":8},{"media":8.72,"nr":8},{"media":8.7,"nr":7},{"media":8.67,"nr":8},{"media":8.65,"nr":2}]},{"nume":"Filologie","total":26,"prag":8.62,"max":9.22,"medie":8.735,"densitatePrag":22,"densitatePragPct":84.6,"distributie":[{"media":9.22,"nr":1},{"media":9.12,"nr":1},{"media":8.95,"nr":1},{"media":8.85,"nr":1},{"media":8.77,"nr":2},{"media":8.75,"nr":1},{"media":8.72,"nr":2},{"media":8.7,"nr":3},{"media":8.67,"nr":5},{"media":8.65,"nr":7},{"media":8.62,"nr":2}]}]},{"rank":30,"cod":"4061103532","nume":"Liceul Teoretic Bilingv „Miguel de Cervantes”","specializari":[{"nume":"Matematică-Informatică","total":26,"prag":9.15,"max":9.52,"medie":9.207,"densitatePrag":25,"densitatePragPct":96.2,"distributie":[{"media":9.52,"nr":1},{"media":9.3,"nr":1},{"media":9.28,"nr":1},{"media":9.27,"nr":3},{"media":9.22,"nr":2},{"media":9.2,"nr":3},{"media":9.17,"nr":9},{"media":9.15,"nr":6}]},{"nume":"Matematică-Informatică (bilingv spaniolă, cu examen)","total":26,"prag":8.8,"max":9.85,"medie":9.101,"densitatePrag":13,"densitatePragPct":50.0,"distributie":[{"media":9.85,"nr":1},{"media":9.8,"nr":1},{"media":9.4,"nr":1},{"media":9.32,"nr":1},{"media":9.25,"nr":1},{"media":9.22,"nr":3},{"media":9.2,"nr":1},{"media":9.1,"nr":1},{"media":9.05,"nr":1},{"media":9.02,"nr":2},{"media":9.0,"nr":5},{"media":8.97,"nr":1},{"media":8.95,"nr":1},{"media":8.92,"nr":1},{"media":8.85,"nr":1},{"media":8.82,"nr":3},{"media":8.8,"nr":1}]},{"nume":"Filologie","total":26,"prag":9.0,"max":9.47,"medie":9.066,"densitatePrag":25,"densitatePragPct":96.2,"distributie":[{"media":9.47,"nr":1},{"media":9.17,"nr":1},{"media":9.15,"nr":1},{"media":9.1,"nr":2},{"media":9.07,"nr":3},{"media":9.05,"nr":6},{"media":9.02,"nr":11},{"media":9.0,"nr":1}]},{"nume":"Filologie (bilingv spaniolă, cu examen)","total":26,"prag":8.47,"max":9.75,"medie":8.875,"densitatePrag":11,"densitatePragPct":42.3,"distributie":[{"media":9.75,"nr":1},{"media":9.65,"nr":1},{"media":9.45,"nr":1},{"media":9.35,"nr":1},{"media":9.2,"nr":1},{"media":9.17,"nr":1},{"media":9.07,"nr":1},{"media":9.05,"nr":1},{"media":9.0,"nr":1},{"media":8.85,"nr":1},{"media":8.82,"nr":1},{"media":8.8,"nr":1},{"media":8.77,"nr":1},{"media":8.72,"nr":1},{"media":8.7,"nr":1},{"media":8.67,"nr":1},{"media":8.65,"nr":1},{"media":8.62,"nr":3},{"media":8.6,"nr":1},{"media":8.55,"nr":2},{"media":8.52,"nr":2},{"media":8.47,"nr":1}]}]}],"totalLicee":99,"totalNerepartizati":261,"dataExtragere":"2025-08-01","citywide":{"total":15812,"distributie":[{"media":10.0,"nr":35},{"media":9.97,"nr":13},{"media":9.95,"nr":40},{"media":9.92,"nr":35},{"media":9.9,"nr":69},{"media":9.87,"nr":55},{"media":9.86,"nr":1},{"media":9.85,"nr":84},{"media":9.82,"nr":79},{"media":9.8,"nr":84},{"media":9.78,"nr":1},{"media":9.77,"nr":99},{"media":9.76,"nr":1},{"media":9.75,"nr":103},{"media":9.73,"nr":2},{"media":9.72,"nr":113},{"media":9.7,"nr":119},{"media":9.68,"nr":2},{"media":9.67,"nr":116},{"media":9.65,"nr":132},{"media":9.63,"nr":1},{"media":9.62,"nr":131},{"media":9.61,"nr":1},{"media":9.6,"nr":153},{"media":9.58,"nr":2},{"media":9.57,"nr":134},{"media":9.55,"nr":118},{"media":9.53,"nr":1},{"media":9.52,"nr":150},{"media":9.51,"nr":2},{"media":9.5,"nr":134},{"media":9.48,"nr":2},{"media":9.47,"nr":162},{"media":9.46,"nr":1},{"media":9.45,"nr":150},{"media":9.43,"nr":1},{"media":9.42,"nr":133},{"media":9.41,"nr":7},{"media":9.4,"nr":166},{"media":9.38,"nr":4},{"media":9.37,"nr":155},{"media":9.36,"nr":2},{"media":9.35,"nr":135},{"media":9.33,"nr":1},{"media":9.32,"nr":168},{"media":9.31,"nr":2},{"media":9.3,"nr":141},{"media":9.28,"nr":3},{"media":9.27,"nr":171},{"media":9.26,"nr":2},{"media":9.25,"nr":155},{"media":9.23,"nr":3},{"media":9.22,"nr":155},{"media":9.21,"nr":2},{"media":9.2,"nr":157},{"media":9.18,"nr":1},{"media":9.17,"nr":160},{"media":9.15,"nr":156},{"media":9.13,"nr":1},{"media":9.12,"nr":144},{"media":9.11,"nr":3},{"media":9.1,"nr":164},{"media":9.08,"nr":1},{"media":9.07,"nr":147},{"media":9.06,"nr":1},{"media":9.05,"nr":153},{"media":9.03,"nr":1},{"media":9.02,"nr":142},{"media":9.01,"nr":3},{"media":9.0,"nr":129},{"media":8.97,"nr":135},{"media":8.95,"nr":131},{"media":8.93,"nr":1},{"media":8.92,"nr":139},{"media":8.91,"nr":1},{"media":8.9,"nr":124},{"media":8.88,"nr":1},{"media":8.87,"nr":132},{"media":8.86,"nr":1},{"media":8.85,"nr":105},{"media":8.82,"nr":154},{"media":8.8,"nr":113},{"media":8.78,"nr":1},{"media":8.77,"nr":120},{"media":8.76,"nr":1},{"media":8.75,"nr":146},{"media":8.73,"nr":1},{"media":8.72,"nr":107},{"media":8.71,"nr":1},{"media":8.7,"nr":125},{"media":8.68,"nr":1},{"media":8.67,"nr":124},{"media":8.66,"nr":1},{"media":8.65,"nr":114},{"media":8.63,"nr":1},{"media":8.62,"nr":113},{"media":8.61,"nr":3},{"media":8.6,"nr":121},{"media":8.58,"nr":3},{"media":8.57,"nr":105},{"media":8.56,"nr":1},{"media":8.55,"nr":119},{"media":8.53,"nr":2},{"media":8.52,"nr":129},{"media":8.51,"nr":4},{"media":8.5,"nr":113},{"media":8.48,"nr":2},{"media":8.47,"nr":126},{"media":8.46,"nr":2},{"media":8.45,"nr":116},{"media":8.43,"nr":1},{"media":8.42,"nr":112},{"media":8.4,"nr":97},{"media":8.38,"nr":2},{"media":8.37,"nr":101},{"media":8.35,"nr":102},{"media":8.32,"nr":95},{"media":8.31,"nr":1},{"media":8.3,"nr":92},{"media":8.28,"nr":1},{"media":8.27,"nr":104},{"media":8.26,"nr":2},{"media":8.25,"nr":76},{"media":8.22,"nr":100},{"media":8.21,"nr":2},{"media":8.2,"nr":104},{"media":8.18,"nr":1},{"media":8.17,"nr":103},{"media":8.15,"nr":81},{"media":8.13,"nr":3},{"media":8.12,"nr":89},{"media":8.1,"nr":99},{"media":8.07,"nr":86},{"media":8.06,"nr":1},{"media":8.05,"nr":88},{"media":8.02,"nr":80},{"media":8.01,"nr":1},{"media":8.0,"nr":89},{"media":7.97,"nr":83},{"media":7.95,"nr":89},{"media":7.93,"nr":1},{"media":7.92,"nr":68},{"media":7.91,"nr":1},{"media":7.9,"nr":85},{"media":7.87,"nr":71},{"media":7.85,"nr":75},{"media":7.83,"nr":1},{"media":7.82,"nr":87},{"media":7.81,"nr":1},{"media":7.8,"nr":80},{"media":7.77,"nr":72},{"media":7.76,"nr":1},{"media":7.75,"nr":64},{"media":7.73,"nr":1},{"media":7.72,"nr":59},{"media":7.71,"nr":1},{"media":7.7,"nr":62},{"media":7.67,"nr":73},{"media":7.65,"nr":76},{"media":7.62,"nr":69},{"media":7.61,"nr":2},{"media":7.6,"nr":76},{"media":7.58,"nr":1},{"media":7.57,"nr":68},{"media":7.55,"nr":61},{"media":7.53,"nr":2},{"media":7.52,"nr":58},{"media":7.5,"nr":74},{"media":7.47,"nr":70},{"media":7.45,"nr":55},{"media":7.42,"nr":63},{"media":7.41,"nr":2},{"media":7.4,"nr":70},{"media":7.37,"nr":58},{"media":7.35,"nr":48},{"media":7.32,"nr":49},{"media":7.31,"nr":1},{"media":7.3,"nr":61},{"media":7.27,"nr":72},{"media":7.26,"nr":1},{"media":7.25,"nr":65},{"media":7.22,"nr":67},{"media":7.21,"nr":1},{"media":7.2,"nr":58},{"media":7.17,"nr":66},{"media":7.15,"nr":54},{"media":7.12,"nr":49},{"media":7.1,"nr":60},{"media":7.07,"nr":45},{"media":7.06,"nr":1},{"media":7.05,"nr":55},{"media":7.03,"nr":1},{"media":7.02,"nr":54},{"media":7.0,"nr":59},{"media":6.97,"nr":53},{"media":6.95,"nr":60},{"media":6.93,"nr":2},{"media":6.92,"nr":52},{"media":6.9,"nr":51},{"media":6.87,"nr":55},{"media":6.85,"nr":44},{"media":6.83,"nr":1},{"media":6.82,"nr":41},{"media":6.8,"nr":48},{"media":6.77,"nr":44},{"media":6.75,"nr":48},{"media":6.72,"nr":44},{"media":6.7,"nr":45},{"media":6.67,"nr":62},{"media":6.65,"nr":42},{"media":6.62,"nr":45},{"media":6.61,"nr":1},{"media":6.6,"nr":48},{"media":6.57,"nr":55},{"media":6.55,"nr":47},{"media":6.52,"nr":58},{"media":6.5,"nr":48},{"media":6.47,"nr":35},{"media":6.46,"nr":1},{"media":6.45,"nr":36},{"media":6.43,"nr":1},{"media":6.42,"nr":39},{"media":6.4,"nr":47},{"media":6.38,"nr":1},{"media":6.37,"nr":42},{"media":6.35,"nr":38},{"media":6.32,"nr":34},{"media":6.31,"nr":1},{"media":6.3,"nr":47},{"media":6.27,"nr":44},{"media":6.25,"nr":36},{"media":6.22,"nr":38},{"media":6.2,"nr":41},{"media":6.17,"nr":50},{"media":6.16,"nr":1},{"media":6.15,"nr":41},{"media":6.12,"nr":32},{"media":6.1,"nr":45},{"media":6.07,"nr":29},{"media":6.05,"nr":29},{"media":6.02,"nr":32},{"media":6.0,"nr":32},{"media":5.97,"nr":35},{"media":5.95,"nr":36},{"media":5.92,"nr":25},{"media":5.9,"nr":27},{"media":5.87,"nr":40},{"media":5.85,"nr":37},{"media":5.82,"nr":33},{"media":5.8,"nr":38},{"media":5.77,"nr":29},{"media":5.75,"nr":42},{"media":5.72,"nr":31},{"media":5.7,"nr":29},{"media":5.67,"nr":42},{"media":5.65,"nr":32},{"media":5.62,"nr":33},{"media":5.6,"nr":28},{"media":5.57,"nr":42},{"media":5.55,"nr":26},{"media":5.52,"nr":27},{"media":5.5,"nr":18},{"media":5.47,"nr":20},{"media":5.45,"nr":27},{"media":5.42,"nr":19},{"media":5.4,"nr":25},{"media":5.37,"nr":26},{"media":5.35,"nr":28},{"media":5.32,"nr":16},{"media":5.3,"nr":29},{"media":5.27,"nr":33},{"media":5.25,"nr":31},{"media":5.22,"nr":31},{"media":5.2,"nr":26},{"media":5.17,"nr":29},{"media":5.15,"nr":19},{"media":5.12,"nr":19},{"media":5.1,"nr":23},{"media":5.07,"nr":17},{"media":5.05,"nr":12},{"media":5.02,"nr":13},{"media":5.0,"nr":26},{"media":4.97,"nr":14},{"media":4.95,"nr":21},{"media":4.92,"nr":28},{"media":4.9,"nr":16},{"media":4.87,"nr":16},{"media":4.85,"nr":14},{"media":4.82,"nr":17},{"media":4.8,"nr":19},{"media":4.77,"nr":15},{"media":4.75,"nr":17},{"media":4.72,"nr":7},{"media":4.7,"nr":14},{"media":4.67,"nr":12},{"media":4.65,"nr":18},{"media":4.62,"nr":14},{"media":4.6,"nr":16},{"media":4.57,"nr":10},{"media":4.55,"nr":8},{"media":4.52,"nr":11},{"media":4.51,"nr":1},{"media":4.5,"nr":16},{"media":4.47,"nr":10},{"media":4.45,"nr":10},{"media":4.42,"nr":16},{"media":4.4,"nr":8},{"media":4.37,"nr":15},{"media":4.35,"nr":16},{"media":4.32,"nr":15},{"media":4.3,"nr":11},{"media":4.27,"nr":9},{"media":4.25,"nr":5},{"media":4.22,"nr":13},{"media":4.2,"nr":17},{"media":4.17,"nr":7},{"media":4.15,"nr":13},{"media":4.12,"nr":10},{"media":4.1,"nr":11},{"media":4.07,"nr":5},{"media":4.05,"nr":6},{"media":4.02,"nr":8},{"media":4.0,"nr":6},{"media":3.97,"nr":14},{"media":3.96,"nr":1},{"media":3.95,"nr":5},{"media":3.92,"nr":3},{"media":3.9,"nr":7},{"media":3.87,"nr":9},{"media":3.85,"nr":8},{"media":3.82,"nr":8},{"media":3.8,"nr":9},{"media":3.77,"nr":5},{"media":3.75,"nr":5},{"media":3.72,"nr":3},{"media":3.7,"nr":5},{"media":3.67,"nr":4},{"media":3.65,"nr":4},{"media":3.62,"nr":5},{"media":3.6,"nr":4},{"media":3.57,"nr":5},{"media":3.55,"nr":7},{"media":3.52,"nr":1},{"media":3.5,"nr":1},{"media":3.47,"nr":5},{"media":3.45,"nr":4},{"media":3.42,"nr":3},{"media":3.4,"nr":3},{"media":3.37,"nr":4},{"media":3.35,"nr":4},{"media":3.32,"nr":2},{"media":3.3,"nr":3},{"media":3.27,"nr":7},{"media":3.25,"nr":1},{"media":3.22,"nr":8},{"media":3.2,"nr":1},{"media":3.17,"nr":3},{"media":3.15,"nr":3},{"media":3.12,"nr":1},{"media":3.1,"nr":4},{"media":3.07,"nr":3},{"media":3.05,"nr":3},{"media":3.02,"nr":3},{"media":3.0,"nr":2},{"media":2.97,"nr":1},{"media":2.95,"nr":3},{"media":2.92,"nr":2},{"media":2.9,"nr":3},{"media":2.87,"nr":2},{"media":2.85,"nr":3},{"media":2.82,"nr":1},{"media":2.8,"nr":1},{"media":2.77,"nr":1},{"media":2.75,"nr":2},{"media":2.72,"nr":1},{"media":2.7,"nr":2},{"media":2.67,"nr":1},{"media":2.65,"nr":2},{"media":2.55,"nr":2},{"media":2.52,"nr":1},{"media":2.47,"nr":1},{"media":2.45,"nr":2},{"media":2.42,"nr":1},{"media":2.4,"nr":2},{"media":2.37,"nr":1},{"media":2.25,"nr":2},{"media":2.05,"nr":1},{"media":1.85,"nr":1}]}},"2024":{"licee":[{"rank":1,"cod":"Colegiul Naţional „Gheorghe Lazăr”","nume":"Colegiul Naţional „Gheorghe Lazăr”","specializari":[{"nume":"Matematică-Informatică","total":78,"prag":9.85,"max":10.0,"medie":9.91,"densitatePrag":78,"densitatePragPct":100.0,"distributie":[{"media":10.0,"nr":8},{"media":9.97,"nr":8},{"media":9.95,"nr":10},{"media":9.92,"nr":12},{"media":9.9,"nr":10},{"media":9.87,"nr":10},{"media":9.85,"nr":20}]},{"nume":"Ştiinţe ale Naturii","total":78,"prag":9.8,"max":10.0,"medie":9.867,"densitatePrag":78,"densitatePragPct":100.0,"distributie":[{"media":10.0,"nr":4},{"media":9.97,"nr":1},{"media":9.95,"nr":9},{"media":9.92,"nr":5},{"media":9.9,"nr":10},{"media":9.87,"nr":8},{"media":9.85,"nr":6},{"media":9.82,"nr":22},{"media":9.8,"nr":13}]},{"nume":"Ştiinţe Sociale","total":52,"prag":9.65,"max":10.0,"medie":9.745,"densitatePrag":42,"densitatePragPct":80.8,"distributie":[{"media":10.0,"nr":1},{"media":9.95,"nr":2},{"media":9.92,"nr":3},{"media":9.9,"nr":2},{"media":9.87,"nr":2},{"media":9.85,"nr":1},{"media":9.82,"nr":1},{"media":9.8,"nr":2},{"media":9.77,"nr":3},{"media":9.75,"nr":3},{"media":9.72,"nr":7},{"media":9.7,"nr":6},{"media":9.67,"nr":7},{"media":9.65,"nr":12}]},{"nume":"Filologie","total":26,"prag":9.57,"max":9.85,"medie":9.637,"densitatePrag":24,"densitatePragPct":92.3,"distributie":[{"media":9.85,"nr":1},{"media":9.82,"nr":1},{"media":9.75,"nr":1},{"media":9.72,"nr":1},{"media":9.67,"nr":3},{"media":9.65,"nr":2},{"media":9.62,"nr":4},{"media":9.6,"nr":7},{"media":9.57,"nr":6}]}]},{"rank":2,"cod":"Colegiul Naţional „Sfântul Sava”","nume":"Colegiul Naţional „Sfântul Sava”","specializari":[{"nume":"Ştiinţe ale Naturii","total":52,"prag":9.72,"max":10.0,"medie":9.836,"densitatePrag":48,"densitatePragPct":92.3,"distributie":[{"media":10.0,"nr":3},{"media":9.97,"nr":1},{"media":9.92,"nr":5},{"media":9.9,"nr":6},{"media":9.87,"nr":5},{"media":9.85,"nr":6},{"media":9.82,"nr":5},{"media":9.8,"nr":2},{"media":9.77,"nr":7},{"media":9.76,"nr":1},{"media":9.75,"nr":10},{"media":9.72,"nr":1}]},{"nume":"Matematică-Informatică","total":156,"prag":9.67,"max":9.97,"medie":9.773,"densitatePrag":143,"densitatePragPct":91.7,"distributie":[{"media":9.97,"nr":1},{"media":9.95,"nr":2},{"media":9.92,"nr":2},{"media":9.9,"nr":8},{"media":9.87,"nr":8},{"media":9.85,"nr":7},{"media":9.82,"nr":20},{"media":9.8,"nr":16},{"media":9.77,"nr":16},{"media":9.75,"nr":18},{"media":9.72,"nr":24},{"media":9.7,"nr":25},{"media":9.67,"nr":9}]},{"nume":"Matematică-Informatică (bilingv engleză, cu examen)","total":26,"prag":9.9,"max":10.0,"medie":9.952,"densitatePrag":26,"densitatePragPct":100.0,"distributie":[{"media":10.0,"nr":7},{"media":9.97,"nr":3},{"media":9.95,"nr":8},{"media":9.92,"nr":2},{"media":9.9,"nr":6}]},{"nume":"Filologie","total":26,"prag":9.52,"max":9.87,"medie":9.627,"densitatePrag":21,"densitatePragPct":80.8,"distributie":[{"media":9.87,"nr":2},{"media":9.85,"nr":1},{"media":9.8,"nr":1},{"media":9.75,"nr":1},{"media":9.67,"nr":1},{"media":9.65,"nr":2},{"media":9.62,"nr":2},{"media":9.6,"nr":4},{"media":9.57,"nr":4},{"media":9.55,"nr":4},{"media":9.52,"nr":4}]}]},{"rank":3,"cod":"Colegiul Național „Spiru Haret”","nume":"Colegiul Național „Spiru Haret”","specializari":[{"nume":"Matematică-Informatică","total":52,"prag":9.72,"max":9.95,"medie":9.772,"densitatePrag":51,"densitatePragPct":98.1,"distributie":[{"media":9.95,"nr":1},{"media":9.9,"nr":1},{"media":9.87,"nr":1},{"media":9.82,"nr":2},{"media":9.8,"nr":10},{"media":9.77,"nr":11},{"media":9.75,"nr":20},{"media":9.72,"nr":6}]},{"nume":"Matematică-Informatică (bilingv engleză, cu examen)","total":26,"prag":9.8,"max":10.0,"medie":9.86,"densitatePrag":26,"densitatePragPct":100.0,"distributie":[{"media":10.0,"nr":1},{"media":9.97,"nr":1},{"media":9.9,"nr":4},{"media":9.87,"nr":5},{"media":9.85,"nr":5},{"media":9.82,"nr":9},{"media":9.8,"nr":1}]},{"nume":"Ştiinţe ale Naturii","total":52,"prag":9.67,"max":9.97,"medie":9.742,"densitatePrag":50,"densitatePragPct":96.2,"distributie":[{"media":9.97,"nr":1},{"media":9.95,"nr":1},{"media":9.87,"nr":3},{"media":9.8,"nr":2},{"media":9.77,"nr":6},{"media":9.75,"nr":9},{"media":9.72,"nr":14},{"media":9.7,"nr":9},{"media":9.67,"nr":7}]},{"nume":"Ştiinţe Sociale","total":52,"prag":9.5,"max":9.97,"medie":9.587,"densitatePrag":48,"densitatePragPct":92.3,"distributie":[{"media":9.97,"nr":1},{"media":9.87,"nr":1},{"media":9.85,"nr":1},{"media":9.72,"nr":1},{"media":9.7,"nr":2},{"media":9.67,"nr":1},{"media":9.65,"nr":2},{"media":9.62,"nr":8},{"media":9.6,"nr":4},{"media":9.57,"nr":3},{"media":9.55,"nr":9},{"media":9.52,"nr":12},{"media":9.5,"nr":7}]},{"nume":"Filologie","total":26,"prag":9.42,"max":9.9,"medie":9.492,"densitatePrag":24,"densitatePragPct":92.3,"distributie":[{"media":9.9,"nr":1},{"media":9.85,"nr":1},{"media":9.55,"nr":1},{"media":9.5,"nr":2},{"media":9.47,"nr":8},{"media":9.45,"nr":9},{"media":9.42,"nr":4}]}]},{"rank":4,"cod":"Colegiul Naţional de Informatică „Tudor Vianu”","nume":"Colegiul Naţional de Informatică „Tudor Vianu”","specializari":[{"nume":"Matematică-Informatică","total":208,"prag":9.62,"max":10.0,"medie":9.769,"densitatePrag":149,"densitatePragPct":71.6,"distributie":[{"media":10.0,"nr":4},{"media":9.97,"nr":5},{"media":9.95,"nr":7},{"media":9.92,"nr":8},{"media":9.9,"nr":12},{"media":9.87,"nr":9},{"media":9.85,"nr":14},{"media":9.82,"nr":9},{"media":9.8,"nr":13},{"media":9.77,"nr":18},{"media":9.75,"nr":13},{"media":9.72,"nr":18},{"media":9.7,"nr":28},{"media":9.67,"nr":17},{"media":9.65,"nr":23},{"media":9.62,"nr":10}]},{"nume":"Matematică-Informatică (bilingv germană, fără examen)","total":26,"prag":9.7,"max":10.0,"medie":9.825,"densitatePrag":21,"densitatePragPct":80.8,"distributie":[{"media":10.0,"nr":1},{"media":9.95,"nr":3},{"media":9.92,"nr":1},{"media":9.9,"nr":1},{"media":9.87,"nr":1},{"media":9.85,"nr":4},{"media":9.82,"nr":4},{"media":9.8,"nr":3},{"media":9.77,"nr":1},{"media":9.75,"nr":2},{"media":9.72,"nr":3},{"media":9.7,"nr":2}]}]},{"rank":5,"cod":"Colegiul Naţional „Grigore Moisil”","nume":"Colegiul Naţional „Grigore Moisil”","specializari":[{"nume":"Matematică-Informatică","total":78,"prag":9.52,"max":9.92,"medie":9.654,"densitatePrag":63,"densitatePragPct":80.8,"distributie":[{"media":9.92,"nr":2},{"media":9.9,"nr":3},{"media":9.87,"nr":1},{"media":9.85,"nr":3},{"media":9.82,"nr":2},{"media":9.8,"nr":2},{"media":9.77,"nr":1},{"media":9.75,"nr":1},{"media":9.72,"nr":3},{"media":9.7,"nr":2},{"media":9.67,"nr":5},{"media":9.65,"nr":8},{"media":9.62,"nr":8},{"media":9.6,"nr":14},{"media":9.57,"nr":9},{"media":9.55,"nr":13},{"media":9.52,"nr":1}]},{"nume":"Ştiinţe ale Naturii","total":26,"prag":9.5,"max":9.87,"medie":9.592,"densitatePrag":23,"densitatePragPct":88.5,"distributie":[{"media":9.87,"nr":1},{"media":9.75,"nr":1},{"media":9.72,"nr":1},{"media":9.7,"nr":1},{"media":9.67,"nr":2},{"media":9.65,"nr":1},{"media":9.62,"nr":2},{"media":9.57,"nr":3},{"media":9.55,"nr":6},{"media":9.52,"nr":5},{"media":9.5,"nr":3}]},{"nume":"Ştiinţe Sociale","total":26,"prag":9.3,"max":9.5,"medie":9.402,"densitatePrag":26,"densitatePragPct":100.0,"distributie":[{"media":9.5,"nr":3},{"media":9.47,"nr":2},{"media":9.45,"nr":3},{"media":9.42,"nr":1},{"media":9.4,"nr":6},{"media":9.37,"nr":5},{"media":9.35,"nr":3},{"media":9.32,"nr":2},{"media":9.3,"nr":1}]},{"nume":"Filologie","total":26,"prag":9.17,"max":9.47,"medie":9.246,"densitatePrag":23,"densitatePragPct":88.5,"distributie":[{"media":9.47,"nr":1},{"media":9.45,"nr":1},{"media":9.4,"nr":1},{"media":9.37,"nr":1},{"media":9.27,"nr":5},{"media":9.25,"nr":1},{"media":9.22,"nr":4},{"media":9.2,"nr":6},{"media":9.17,"nr":6}]}]},{"rank":6,"cod":"Colegiul Național Bilingv „George Coșbuc”","nume":"Colegiul Național Bilingv „George Coșbuc”","specializari":[{"nume":"Matematică-Informatică","total":52,"prag":9.52,"max":9.92,"medie":9.623,"densitatePrag":47,"densitatePragPct":90.4,"distributie":[{"media":9.92,"nr":1},{"media":9.82,"nr":1},{"media":9.77,"nr":2},{"media":9.75,"nr":1},{"media":9.72,"nr":3},{"media":9.7,"nr":2},{"media":9.68,"nr":1},{"media":9.67,"nr":2},{"media":9.65,"nr":7},{"media":9.62,"nr":5},{"media":9.6,"nr":7},{"media":9.57,"nr":7},{"media":9.55,"nr":7},{"media":9.52,"nr":6}]},{"nume":"Ştiinţe ale Naturii","total":26,"prag":9.52,"max":9.87,"medie":9.657,"densitatePrag":21,"densitatePragPct":80.8,"distributie":[{"media":9.87,"nr":1},{"media":9.85,"nr":1},{"media":9.8,"nr":1},{"media":9.77,"nr":1},{"media":9.75,"nr":1},{"media":9.72,"nr":1},{"media":9.67,"nr":5},{"media":9.65,"nr":2},{"media":9.62,"nr":4},{"media":9.6,"nr":4},{"media":9.57,"nr":3},{"media":9.55,"nr":1},{"media":9.52,"nr":1}]},{"nume":"Ştiinţe Sociale","total":26,"prag":9.4,"max":9.85,"medie":9.538,"densitatePrag":20,"densitatePragPct":76.9,"distributie":[{"media":9.85,"nr":1},{"media":9.75,"nr":2},{"media":9.67,"nr":2},{"media":9.62,"nr":1},{"media":9.6,"nr":3},{"media":9.57,"nr":1},{"media":9.52,"nr":1},{"media":9.5,"nr":2},{"media":9.47,"nr":4},{"media":9.45,"nr":5},{"media":9.42,"nr":3},{"media":9.4,"nr":1}]},{"nume":"Filologie","total":52,"prag":9.22,"max":9.82,"medie":9.375,"densitatePrag":42,"densitatePragPct":80.8,"distributie":[{"media":9.82,"nr":1},{"media":9.75,"nr":1},{"media":9.72,"nr":1},{"media":9.65,"nr":1},{"media":9.6,"nr":1},{"media":9.55,"nr":1},{"media":9.52,"nr":1},{"media":9.47,"nr":1},{"media":9.45,"nr":2},{"media":9.42,"nr":3},{"media":9.4,"nr":8},{"media":9.37,"nr":1},{"media":9.35,"nr":6},{"media":9.32,"nr":5},{"media":9.3,"nr":3},{"media":9.27,"nr":7},{"media":9.25,"nr":7},{"media":9.22,"nr":2}]}]},{"rank":7,"cod":"Colegiul Naţional „I.L.Caragiale”","nume":"Colegiul Naţional „I.L.Caragiale”","specializari":[{"nume":"Ştiinţe ale Naturii","total":26,"prag":9.48,"max":9.72,"medie":9.577,"densitatePrag":25,"densitatePragPct":96.2,"distributie":[{"media":9.72,"nr":1},{"media":9.67,"nr":2},{"media":9.65,"nr":2},{"media":9.62,"nr":4},{"media":9.6,"nr":2},{"media":9.57,"nr":6},{"media":9.55,"nr":1},{"media":9.52,"nr":1},{"media":9.5,"nr":6},{"media":9.48,"nr":1}]},{"nume":"Matematică-Informatică","total":78,"prag":9.4,"max":9.9,"medie":9.502,"densitatePrag":72,"densitatePragPct":92.3,"distributie":[{"media":9.9,"nr":2},{"media":9.72,"nr":1},{"media":9.65,"nr":2},{"media":9.62,"nr":1},{"media":9.6,"nr":2},{"media":9.57,"nr":4},{"media":9.55,"nr":9},{"media":9.52,"nr":7},{"media":9.5,"nr":17},{"media":9.47,"nr":7},{"media":9.45,"nr":4},{"media":9.42,"nr":11},{"media":9.4,"nr":11}]},{"nume":"Matematică-Informatică (bilingv germană, cu examen)","total":13,"prag":9.47,"max":9.7,"medie":9.555,"densitatePrag":12,"densitatePragPct":92.3,"distributie":[{"media":9.7,"nr":1},{"media":9.62,"nr":2},{"media":9.6,"nr":1},{"media":9.57,"nr":2},{"media":9.55,"nr":1},{"media":9.52,"nr":2},{"media":9.5,"nr":2},{"media":9.47,"nr":2}]},{"nume":"Matematică-Informatică (bilingv germană, fără examen)","total":13,"prag":9.45,"max":9.67,"medie":9.502,"densitatePrag":12,"densitatePragPct":92.3,"distributie":[{"media":9.67,"nr":1},{"media":9.57,"nr":1},{"media":9.55,"nr":2},{"media":9.52,"nr":1},{"media":9.47,"nr":3},{"media":9.45,"nr":5}]},{"nume":"Matematică-Informatică (bilingv engleză)","total":26,"prag":9.6,"max":9.9,"medie":9.673,"densitatePrag":24,"densitatePragPct":92.3,"distributie":[{"media":9.9,"nr":1},{"media":9.85,"nr":1},{"media":9.8,"nr":1},{"media":9.72,"nr":2},{"media":9.7,"nr":4},{"media":9.67,"nr":3},{"media":9.65,"nr":4},{"media":9.62,"nr":5},{"media":9.6,"nr":5}]},{"nume":"Ştiinţe Sociale","total":26,"prag":9.3,"max":9.75,"medie":9.399,"densitatePrag":23,"densitatePragPct":88.5,"distributie":[{"media":9.75,"nr":1},{"media":9.57,"nr":1},{"media":9.55,"nr":1},{"media":9.5,"nr":1},{"media":9.47,"nr":1},{"media":9.45,"nr":3},{"media":9.42,"nr":1},{"media":9.4,"nr":3},{"media":9.37,"nr":1},{"media":9.35,"nr":4},{"media":9.32,"nr":5},{"media":9.3,"nr":4}]},{"nume":"Filologie","total":26,"prag":9.17,"max":9.42,"medie":9.233,"densitatePrag":24,"densitatePragPct":92.3,"distributie":[{"media":9.42,"nr":1},{"media":9.4,"nr":1},{"media":9.37,"nr":1},{"media":9.27,"nr":3},{"media":9.25,"nr":2},{"media":9.22,"nr":5},{"media":9.2,"nr":8},{"media":9.17,"nr":5}]},{"nume":"Filologie (bilingv germană, cu examen)","total":13,"prag":8.87,"max":9.4,"medie":9.056,"densitatePrag":8,"densitatePragPct":61.5,"distributie":[{"media":9.4,"nr":1},{"media":9.25,"nr":1},{"media":9.2,"nr":1},{"media":9.17,"nr":1},{"media":9.1,"nr":1},{"media":9.02,"nr":1},{"media":9.0,"nr":2},{"media":8.97,"nr":1},{"media":8.93,"nr":1},{"media":8.92,"nr":1},{"media":8.9,"nr":1},{"media":8.87,"nr":1}]},{"nume":"Filologie (bilingv germană, fără examen)","total":13,"prag":9.12,"max":9.52,"medie":9.219,"densitatePrag":11,"densitatePragPct":84.6,"distributie":[{"media":9.52,"nr":1},{"media":9.5,"nr":1},{"media":9.22,"nr":2},{"media":9.2,"nr":1},{"media":9.18,"nr":1},{"media":9.17,"nr":1},{"media":9.15,"nr":4},{"media":9.12,"nr":2}]},{"nume":"Filologie (bilingv engleză, cu examen)","total":26,"prag":9.22,"max":9.5,"medie":9.295,"densitatePrag":25,"densitatePragPct":96.2,"distributie":[{"media":9.5,"nr":1},{"media":9.4,"nr":1},{"media":9.37,"nr":2},{"media":9.35,"nr":2},{"media":9.32,"nr":2},{"media":9.3,"nr":5},{"media":9.27,"nr":5},{"media":9.25,"nr":3},{"media":9.22,"nr":5}]}]},{"rank":8,"cod":"Colegiul Naţional „Gheorghe Şincai”","nume":"Colegiul Naţional „Gheorghe Şincai”","specializari":[{"nume":"Ştiinţe ale Naturii","total":52,"prag":9.45,"max":9.82,"medie":9.572,"densitatePrag":45,"densitatePragPct":86.5,"distributie":[{"media":9.82,"nr":1},{"media":9.77,"nr":1},{"media":9.75,"nr":1},{"media":9.72,"nr":2},{"media":9.7,"nr":1},{"media":9.67,"nr":1},{"media":9.65,"nr":6},{"media":9.62,"nr":3},{"media":9.6,"nr":5},{"media":9.57,"nr":4},{"media":9.55,"nr":5},{"media":9.52,"nr":8},{"media":9.5,"nr":5},{"media":9.47,"nr":4},{"media":9.45,"nr":5}]},{"nume":"Matematică-Informatică","total":130,"prag":9.42,"max":9.92,"medie":9.585,"densitatePrag":96,"densitatePragPct":73.8,"distributie":[{"media":9.92,"nr":1},{"media":9.9,"nr":1},{"media":9.87,"nr":1},{"media":9.85,"nr":1},{"media":9.82,"nr":1},{"media":9.8,"nr":4},{"media":9.77,"nr":4},{"media":9.75,"nr":4},{"media":9.72,"nr":2},{"media":9.7,"nr":5},{"media":9.67,"nr":3},{"media":9.65,"nr":7},{"media":9.62,"nr":9},{"media":9.6,"nr":15},{"media":9.57,"nr":10},{"media":9.55,"nr":10},{"media":9.52,"nr":12},{"media":9.5,"nr":19},{"media":9.47,"nr":4},{"media":9.45,"nr":13},{"media":9.42,"nr":4}]},{"nume":"Filologie","total":26,"prag":9.32,"max":9.55,"medie":9.38,"densitatePrag":25,"densitatePragPct":96.2,"distributie":[{"media":9.55,"nr":1},{"media":9.42,"nr":2},{"media":9.4,"nr":8},{"media":9.37,"nr":4},{"media":9.35,"nr":10},{"media":9.32,"nr":1}]}]},{"rank":9,"cod":"Colegiul Național „Mihai Viteazul”","nume":"Colegiul Național „Mihai Viteazul”","specializari":[{"nume":"Ştiinţe ale Naturii","total":52,"prag":9.45,"max":10.0,"medie":9.602,"densitatePrag":40,"densitatePragPct":76.9,"distributie":[{"media":10.0,"nr":2},{"media":9.9,"nr":1},{"media":9.82,"nr":2},{"media":9.77,"nr":3},{"media":9.72,"nr":3},{"media":9.7,"nr":1},{"media":9.65,"nr":2},{"media":9.62,"nr":5},{"media":9.6,"nr":3},{"media":9.57,"nr":6},{"media":9.55,"nr":5},{"media":9.52,"nr":5},{"media":9.5,"nr":4},{"media":9.47,"nr":6},{"media":9.45,"nr":4}]},{"nume":"Matematică-Informatică","total":208,"prag":9.32,"max":10.0,"medie":9.517,"densitatePrag":120,"densitatePragPct":57.7,"distributie":[{"media":10.0,"nr":1},{"media":9.92,"nr":1},{"media":9.87,"nr":1},{"media":9.85,"nr":1},{"media":9.82,"nr":3},{"media":9.8,"nr":4},{"media":9.77,"nr":2},{"media":9.75,"nr":2},{"media":9.72,"nr":2},{"media":9.7,"nr":8},{"media":9.67,"nr":6},{"media":9.65,"nr":6},{"media":9.62,"nr":15},{"media":9.6,"nr":12},{"media":9.57,"nr":13},{"media":9.55,"nr":11},{"media":9.52,"nr":8},{"media":9.5,"nr":16},{"media":9.47,"nr":12},{"media":9.46,"nr":1},{"media":9.45,"nr":9},{"media":9.42,"nr":16},{"media":9.4,"nr":20},{"media":9.37,"nr":14},{"media":9.35,"nr":16},{"media":9.32,"nr":8}]}]},{"rank":10,"cod":"Colegiul Național „Matei Basarab”","nume":"Colegiul Național „Matei Basarab”","specializari":[{"nume":"Matematică-Informatică","total":104,"prag":9.42,"max":9.95,"medie":9.565,"densitatePrag":80,"densitatePragPct":76.9,"distributie":[{"media":9.95,"nr":1},{"media":9.92,"nr":1},{"media":9.8,"nr":1},{"media":9.75,"nr":3},{"media":9.72,"nr":3},{"media":9.7,"nr":2},{"media":9.67,"nr":7},{"media":9.65,"nr":6},{"media":9.62,"nr":5},{"media":9.6,"nr":11},{"media":9.57,"nr":7},{"media":9.55,"nr":11},{"media":9.52,"nr":9},{"media":9.5,"nr":14},{"media":9.47,"nr":5},{"media":9.45,"nr":13},{"media":9.42,"nr":5}]},{"nume":"Ştiinţe ale Naturii","total":52,"prag":9.42,"max":9.9,"medie":9.547,"densitatePrag":42,"densitatePragPct":80.8,"distributie":[{"media":9.9,"nr":1},{"media":9.87,"nr":2},{"media":9.77,"nr":1},{"media":9.72,"nr":2},{"media":9.7,"nr":1},{"media":9.67,"nr":2},{"media":9.65,"nr":1},{"media":9.62,"nr":4},{"media":9.6,"nr":3},{"media":9.57,"nr":2},{"media":9.55,"nr":4},{"media":9.52,"nr":4},{"media":9.5,"nr":5},{"media":9.47,"nr":1},{"media":9.45,"nr":8},{"media":9.42,"nr":11}]},{"nume":"Ştiinţe Sociale","total":26,"prag":9.35,"max":9.67,"medie":9.438,"densitatePrag":22,"densitatePragPct":84.6,"distributie":[{"media":9.67,"nr":1},{"media":9.62,"nr":1},{"media":9.57,"nr":2},{"media":9.55,"nr":3},{"media":9.47,"nr":1},{"media":9.45,"nr":1},{"media":9.42,"nr":1},{"media":9.4,"nr":6},{"media":9.37,"nr":4},{"media":9.35,"nr":6}]},{"nume":"Filologie","total":26,"prag":9.27,"max":9.62,"medie":9.332,"densitatePrag":25,"densitatePragPct":96.2,"distributie":[{"media":9.62,"nr":1},{"media":9.47,"nr":1},{"media":9.42,"nr":1},{"media":9.4,"nr":1},{"media":9.35,"nr":2},{"media":9.32,"nr":6},{"media":9.3,"nr":11},{"media":9.27,"nr":3}]}]},{"rank":11,"cod":"Colegiul Național „Iulia Hașdeu”","nume":"Colegiul Național „Iulia Hașdeu”","specializari":[{"nume":"Ştiinţe ale Naturii","total":26,"prag":9.35,"max":9.77,"medie":9.468,"densitatePrag":22,"densitatePragPct":84.6,"distributie":[{"media":9.77,"nr":2},{"media":9.72,"nr":1},{"media":9.67,"nr":1},{"media":9.55,"nr":1},{"media":9.5,"nr":1},{"media":9.47,"nr":3},{"media":9.45,"nr":3},{"media":9.42,"nr":4},{"media":9.4,"nr":4},{"media":9.37,"nr":3},{"media":9.35,"nr":3}]},{"nume":"Matematică-Informatică","total":78,"prag":9.27,"max":9.77,"medie":9.346,"densitatePrag":71,"densitatePragPct":91.0,"distributie":[{"media":9.77,"nr":1},{"media":9.65,"nr":1},{"media":9.62,"nr":2},{"media":9.52,"nr":2},{"media":9.5,"nr":1},{"media":9.47,"nr":3},{"media":9.42,"nr":3},{"media":9.4,"nr":1},{"media":9.37,"nr":5},{"media":9.35,"nr":6},{"media":9.32,"nr":16},{"media":9.3,"nr":22},{"media":9.27,"nr":15}]},{"nume":"Matematică-Informatică (bilingv engleză, cu examen)","total":26,"prag":9.4,"max":9.9,"medie":9.523,"densitatePrag":20,"densitatePragPct":76.9,"distributie":[{"media":9.9,"nr":1},{"media":9.87,"nr":1},{"media":9.72,"nr":1},{"media":9.65,"nr":3},{"media":9.6,"nr":1},{"media":9.55,"nr":1},{"media":9.52,"nr":1},{"media":9.5,"nr":3},{"media":9.47,"nr":1},{"media":9.45,"nr":5},{"media":9.42,"nr":4},{"media":9.4,"nr":4}]},{"nume":"Filologie","total":52,"prag":9.1,"max":9.42,"medie":9.17,"densitatePrag":47,"densitatePragPct":90.4,"distributie":[{"media":9.42,"nr":1},{"media":9.35,"nr":2},{"media":9.32,"nr":2},{"media":9.3,"nr":1},{"media":9.27,"nr":1},{"media":9.25,"nr":1},{"media":9.22,"nr":2},{"media":9.2,"nr":6},{"media":9.17,"nr":5},{"media":9.15,"nr":8},{"media":9.12,"nr":13},{"media":9.1,"nr":10}]},{"nume":"Filologie (bilingv spaniolă, cu examen)","total":26,"prag":7.92,"max":9.42,"medie":8.46,"densitatePrag":5,"densitatePragPct":19.2,"distributie":[{"media":9.42,"nr":1},{"media":8.95,"nr":1},{"media":8.9,"nr":1},{"media":8.87,"nr":2},{"media":8.85,"nr":1},{"media":8.77,"nr":2},{"media":8.72,"nr":1},{"media":8.55,"nr":1},{"media":8.47,"nr":1},{"media":8.45,"nr":1},{"media":8.4,"nr":2},{"media":8.32,"nr":2},{"media":8.27,"nr":2},{"media":8.2,"nr":1},{"media":8.15,"nr":2},{"media":8.05,"nr":1},{"media":8.0,"nr":1},{"media":7.97,"nr":1},{"media":7.95,"nr":1},{"media":7.92,"nr":1}]},{"nume":"Filologie (bilingv engleză, cu examen)","total":26,"prag":9.15,"max":9.67,"medie":9.265,"densitatePrag":21,"densitatePragPct":80.8,"distributie":[{"media":9.67,"nr":1},{"media":9.45,"nr":1},{"media":9.4,"nr":3},{"media":9.35,"nr":1},{"media":9.32,"nr":1},{"media":9.27,"nr":2},{"media":9.25,"nr":1},{"media":9.22,"nr":5},{"media":9.2,"nr":5},{"media":9.17,"nr":5},{"media":9.15,"nr":1}]}]},{"rank":12,"cod":"Colegiul Naţional „Ion Creangă”","nume":"Colegiul Naţional „Ion Creangă”","specializari":[{"nume":"Matematică-Informatică","total":52,"prag":9.3,"max":9.65,"medie":9.368,"densitatePrag":49,"densitatePragPct":94.2,"distributie":[{"media":9.65,"nr":2},{"media":9.6,"nr":1},{"media":9.5,"nr":1},{"media":9.42,"nr":2},{"media":9.4,"nr":3},{"media":9.37,"nr":12},{"media":9.35,"nr":13},{"media":9.32,"nr":15},{"media":9.3,"nr":3}]},{"nume":"Matematică-Informatică (bilingv engleză, cu examen)","total":26,"prag":9.37,"max":9.82,"medie":9.462,"densitatePrag":24,"densitatePragPct":92.3,"distributie":[{"media":9.82,"nr":1},{"media":9.62,"nr":1},{"media":9.57,"nr":1},{"media":9.55,"nr":1},{"media":9.52,"nr":1},{"media":9.5,"nr":1},{"media":9.47,"nr":4},{"media":9.45,"nr":1},{"media":9.42,"nr":8},{"media":9.4,"nr":5},{"media":9.37,"nr":2}]},{"nume":"Ştiinţe ale Naturii","total":52,"prag":9.25,"max":9.65,"medie":9.335,"densitatePrag":47,"densitatePragPct":90.4,"distributie":[{"media":9.65,"nr":2},{"media":9.55,"nr":1},{"media":9.5,"nr":1},{"media":9.47,"nr":1},{"media":9.45,"nr":2},{"media":9.42,"nr":2},{"media":9.4,"nr":1},{"media":9.37,"nr":2},{"media":9.35,"nr":2},{"media":9.32,"nr":10},{"media":9.3,"nr":10},{"media":9.27,"nr":16},{"media":9.25,"nr":2}]},{"nume":"Ştiinţe Sociale","total":26,"prag":9.17,"max":9.55,"medie":9.253,"densitatePrag":23,"densitatePragPct":88.5,"distributie":[{"media":9.55,"nr":1},{"media":9.5,"nr":1},{"media":9.47,"nr":1},{"media":9.35,"nr":1},{"media":9.32,"nr":1},{"media":9.27,"nr":2},{"media":9.25,"nr":4},{"media":9.22,"nr":5},{"media":9.2,"nr":2},{"media":9.17,"nr":8}]},{"nume":"Filologie","total":52,"prag":9.07,"max":9.55,"medie":9.15,"densitatePrag":46,"densitatePragPct":88.5,"distributie":[{"media":9.55,"nr":1},{"media":9.4,"nr":1},{"media":9.37,"nr":2},{"media":9.32,"nr":1},{"media":9.3,"nr":1},{"media":9.25,"nr":1},{"media":9.22,"nr":1},{"media":9.2,"nr":3},{"media":9.17,"nr":1},{"media":9.15,"nr":5},{"media":9.12,"nr":14},{"media":9.1,"nr":12},{"media":9.07,"nr":9}]}]},{"rank":13,"cod":"Liceul Teoretic „Alexandru Ioan Cuza”","nume":"Liceul Teoretic „Alexandru Ioan Cuza”","specializari":[{"nume":"Ştiinţe ale Naturii","total":26,"prag":9.25,"max":9.85,"medie":9.437,"densitatePrag":19,"densitatePragPct":73.1,"distributie":[{"media":9.85,"nr":1},{"media":9.67,"nr":1},{"media":9.6,"nr":2},{"media":9.57,"nr":1},{"media":9.55,"nr":2},{"media":9.45,"nr":4},{"media":9.42,"nr":1},{"media":9.4,"nr":4},{"media":9.37,"nr":1},{"media":9.35,"nr":4},{"media":9.32,"nr":1},{"media":9.3,"nr":1},{"media":9.27,"nr":1},{"media":9.25,"nr":2}]},{"nume":"Matematică-Informatică","total":130,"prag":9.1,"max":9.9,"medie":9.282,"densitatePrag":89,"densitatePragPct":68.5,"distributie":[{"media":9.9,"nr":1},{"media":9.85,"nr":1},{"media":9.82,"nr":1},{"media":9.75,"nr":2},{"media":9.7,"nr":1},{"media":9.65,"nr":1},{"media":9.62,"nr":3},{"media":9.6,"nr":1},{"media":9.57,"nr":3},{"media":9.55,"nr":1},{"media":9.5,"nr":2},{"media":9.47,"nr":1},{"media":9.45,"nr":4},{"media":9.42,"nr":1},{"media":9.4,"nr":4},{"media":9.37,"nr":5},{"media":9.35,"nr":3},{"media":9.32,"nr":6},{"media":9.3,"nr":4},{"media":9.27,"nr":4},{"media":9.25,"nr":10},{"media":9.22,"nr":7},{"media":9.2,"nr":15},{"media":9.17,"nr":16},{"media":9.15,"nr":14},{"media":9.12,"nr":17},{"media":9.1,"nr":2}]},{"nume":"Ştiinţe Sociale","total":52,"prag":9.0,"max":9.5,"medie":9.082,"densitatePrag":46,"densitatePragPct":88.5,"distributie":[{"media":9.5,"nr":1},{"media":9.35,"nr":1},{"media":9.32,"nr":1},{"media":9.27,"nr":2},{"media":9.25,"nr":1},{"media":9.2,"nr":1},{"media":9.17,"nr":1},{"media":9.15,"nr":2},{"media":9.12,"nr":1},{"media":9.1,"nr":4},{"media":9.07,"nr":6},{"media":9.05,"nr":10},{"media":9.02,"nr":11},{"media":9.0,"nr":10}]}]},{"rank":14,"cod":"Colegiul German „Goethe”","nume":"Colegiul German „Goethe”","specializari":[{"nume":"Teor.real spec.germană","total":25,"prag":9.23,"max":9.9,"medie":9.587,"densitatePrag":8,"densitatePragPct":32.0,"distributie":[{"media":9.9,"nr":1},{"media":9.86,"nr":1},{"media":9.8,"nr":2},{"media":9.78,"nr":1},{"media":9.76,"nr":1},{"media":9.7,"nr":3},{"media":9.65,"nr":3},{"media":9.63,"nr":1},{"media":9.58,"nr":1},{"media":9.56,"nr":2},{"media":9.48,"nr":1},{"media":9.43,"nr":1},{"media":9.4,"nr":2},{"media":9.38,"nr":1},{"media":9.36,"nr":3},{"media":9.23,"nr":1}]},{"nume":"Teor.uman.spec.germană","total":25,"prag":8.98,"max":9.63,"medie":9.201,"densitatePrag":11,"densitatePragPct":44.0,"distributie":[{"media":9.63,"nr":1},{"media":9.5,"nr":2},{"media":9.35,"nr":1},{"media":9.28,"nr":1},{"media":9.25,"nr":1},{"media":9.23,"nr":2},{"media":9.21,"nr":1},{"media":9.2,"nr":5},{"media":9.16,"nr":1},{"media":9.15,"nr":2},{"media":9.11,"nr":1},{"media":9.1,"nr":1},{"media":9.08,"nr":2},{"media":9.06,"nr":1},{"media":9.0,"nr":1},{"media":8.98,"nr":2}]},{"nume":"Matematică-Informatică","total":26,"prag":8.36,"max":9.9,"medie":8.942,"densitatePrag":4,"densitatePragPct":15.4,"distributie":[{"media":9.9,"nr":1},{"media":9.81,"nr":1},{"media":9.75,"nr":1},{"media":9.25,"nr":1},{"media":9.21,"nr":1},{"media":9.13,"nr":2},{"media":8.98,"nr":1},{"media":8.95,"nr":2},{"media":8.91,"nr":2},{"media":8.9,"nr":2},{"media":8.88,"nr":1},{"media":8.81,"nr":1},{"media":8.8,"nr":1},{"media":8.78,"nr":1},{"media":8.76,"nr":1},{"media":8.75,"nr":1},{"media":8.65,"nr":1},{"media":8.6,"nr":1},{"media":8.51,"nr":1},{"media":8.5,"nr":1},{"media":8.4,"nr":1},{"media":8.36,"nr":1}]},{"nume":"Filologie","total":26,"prag":7.42,"max":8.95,"medie":8.203,"densitatePrag":2,"densitatePragPct":7.7,"distributie":[{"media":8.95,"nr":1},{"media":8.93,"nr":1},{"media":8.66,"nr":1},{"media":8.65,"nr":1},{"media":8.55,"nr":1},{"media":8.51,"nr":1},{"media":8.5,"nr":1},{"media":8.43,"nr":1},{"media":8.41,"nr":1},{"media":8.4,"nr":1},{"media":8.31,"nr":1},{"media":8.3,"nr":1},{"media":8.28,"nr":1},{"media":8.25,"nr":2},{"media":8.11,"nr":1},{"media":8.03,"nr":1},{"media":7.96,"nr":1},{"media":7.91,"nr":1},{"media":7.9,"nr":1},{"media":7.85,"nr":1},{"media":7.81,"nr":1},{"media":7.76,"nr":1},{"media":7.63,"nr":1},{"media":7.51,"nr":1},{"media":7.42,"nr":1}]}]},{"rank":15,"cod":"Colegiul Național „Cantemir Vodă”","nume":"Colegiul Național „Cantemir Vodă”","specializari":[{"nume":"Matematică-Informatică","total":104,"prag":9.22,"max":9.7,"medie":9.311,"densitatePrag":95,"densitatePragPct":91.3,"distributie":[{"media":9.7,"nr":1},{"media":9.65,"nr":2},{"media":9.62,"nr":1},{"media":9.6,"nr":1},{"media":9.5,"nr":1},{"media":9.47,"nr":1},{"media":9.45,"nr":2},{"media":9.42,"nr":1},{"media":9.4,"nr":7},{"media":9.37,"nr":4},{"media":9.35,"nr":5},{"media":9.32,"nr":13},{"media":9.3,"nr":12},{"media":9.27,"nr":15},{"media":9.25,"nr":21},{"media":9.22,"nr":17}]},{"nume":"Matematică-Informatică (bilingv engleză, cu examen)","total":26,"prag":9.42,"max":9.75,"medie":9.506,"densitatePrag":24,"densitatePragPct":92.3,"distributie":[{"media":9.75,"nr":1},{"media":9.65,"nr":1},{"media":9.6,"nr":3},{"media":9.57,"nr":2},{"media":9.55,"nr":1},{"media":9.5,"nr":4},{"media":9.47,"nr":6},{"media":9.45,"nr":3},{"media":9.42,"nr":5}]},{"nume":"Ştiinţe ale Naturii","total":52,"prag":9.22,"max":9.77,"medie":9.382,"densitatePrag":41,"densitatePragPct":78.8,"distributie":[{"media":9.77,"nr":1},{"media":9.65,"nr":1},{"media":9.62,"nr":1},{"media":9.6,"nr":2},{"media":9.57,"nr":1},{"media":9.55,"nr":1},{"media":9.52,"nr":2},{"media":9.45,"nr":2},{"media":9.42,"nr":1},{"media":9.4,"nr":7},{"media":9.37,"nr":6},{"media":9.35,"nr":8},{"media":9.32,"nr":5},{"media":9.3,"nr":3},{"media":9.27,"nr":5},{"media":9.25,"nr":5},{"media":9.22,"nr":1}]}]},{"rank":16,"cod":"Colegiul Naţional Elena Cuza","nume":"Colegiul Naţional Elena Cuza","specializari":[{"nume":"Matematică-Informatică","total":52,"prag":9.22,"max":9.82,"medie":9.369,"densitatePrag":38,"densitatePragPct":73.1,"distributie":[{"media":9.82,"nr":1},{"media":9.72,"nr":1},{"media":9.57,"nr":1},{"media":9.52,"nr":2},{"media":9.5,"nr":3},{"media":9.47,"nr":3},{"media":9.45,"nr":3},{"media":9.42,"nr":3},{"media":9.4,"nr":2},{"media":9.37,"nr":3},{"media":9.35,"nr":7},{"media":9.32,"nr":3},{"media":9.3,"nr":4},{"media":9.27,"nr":5},{"media":9.25,"nr":7},{"media":9.22,"nr":4}]},{"nume":"Filologie (bilingv engleză, cu examen)","total":26,"prag":9.02,"max":9.65,"medie":9.205,"densitatePrag":18,"densitatePragPct":69.2,"distributie":[{"media":9.65,"nr":1},{"media":9.55,"nr":1},{"media":9.5,"nr":1},{"media":9.45,"nr":2},{"media":9.32,"nr":1},{"media":9.27,"nr":1},{"media":9.25,"nr":1},{"media":9.22,"nr":2},{"media":9.2,"nr":1},{"media":9.17,"nr":2},{"media":9.15,"nr":1},{"media":9.12,"nr":1},{"media":9.1,"nr":3},{"media":9.07,"nr":2},{"media":9.05,"nr":3},{"media":9.02,"nr":3}]},{"nume":"Filologie","total":26,"prag":8.95,"max":9.55,"medie":9.097,"densitatePrag":23,"densitatePragPct":88.5,"distributie":[{"media":9.55,"nr":1},{"media":9.5,"nr":1},{"media":9.35,"nr":1},{"media":9.15,"nr":2},{"media":9.12,"nr":5},{"media":9.1,"nr":1},{"media":9.05,"nr":5},{"media":9.02,"nr":2},{"media":9.0,"nr":3},{"media":8.97,"nr":4},{"media":8.95,"nr":1}]}]},{"rank":17,"cod":"Liceul Teoretic „Nicolae Iorga”","nume":"Liceul Teoretic „Nicolae Iorga”","specializari":[{"nume":"Matematică-Informatică","total":52,"prag":9.2,"max":9.9,"medie":9.296,"densitatePrag":44,"densitatePragPct":84.6,"distributie":[{"media":9.9,"nr":1},{"media":9.57,"nr":1},{"media":9.55,"nr":1},{"media":9.52,"nr":1},{"media":9.5,"nr":2},{"media":9.45,"nr":1},{"media":9.42,"nr":1},{"media":9.37,"nr":3},{"media":9.35,"nr":2},{"media":9.32,"nr":2},{"media":9.3,"nr":4},{"media":9.27,"nr":4},{"media":9.25,"nr":7},{"media":9.22,"nr":6},{"media":9.2,"nr":16}]},{"nume":"Ştiinţe ale Naturii","total":26,"prag":9.17,"max":9.47,"medie":9.239,"densitatePrag":25,"densitatePragPct":96.2,"distributie":[{"media":9.47,"nr":1},{"media":9.37,"nr":2},{"media":9.35,"nr":2},{"media":9.25,"nr":2},{"media":9.22,"nr":5},{"media":9.2,"nr":11},{"media":9.17,"nr":3}]},{"nume":"Ştiinţe ale Naturii (bilingv engleză, cu examen)","total":26,"prag":9.22,"max":9.62,"medie":9.346,"densitatePrag":22,"densitatePragPct":84.6,"distributie":[{"media":9.62,"nr":1},{"media":9.57,"nr":1},{"media":9.52,"nr":2},{"media":9.42,"nr":2},{"media":9.37,"nr":4},{"media":9.35,"nr":1},{"media":9.32,"nr":2},{"media":9.3,"nr":3},{"media":9.27,"nr":4},{"media":9.25,"nr":5},{"media":9.22,"nr":1}]},{"nume":"Ştiinţe Sociale","total":26,"prag":9.07,"max":9.62,"medie":9.152,"densitatePrag":23,"densitatePragPct":88.5,"distributie":[{"media":9.62,"nr":1},{"media":9.4,"nr":1},{"media":9.3,"nr":1},{"media":9.2,"nr":1},{"media":9.17,"nr":3},{"media":9.15,"nr":3},{"media":9.12,"nr":5},{"media":9.1,"nr":3},{"media":9.07,"nr":8}]},{"nume":"Filologie","total":26,"prag":8.97,"max":9.32,"medie":9.043,"densitatePrag":25,"densitatePragPct":96.2,"distributie":[{"media":9.32,"nr":1},{"media":9.15,"nr":1},{"media":9.12,"nr":1},{"media":9.1,"nr":2},{"media":9.07,"nr":1},{"media":9.05,"nr":5},{"media":9.02,"nr":5},{"media":9.0,"nr":7},{"media":8.97,"nr":3}]}]},{"rank":18,"cod":"Colegiul Naţional „Mihai Eminescu”","nume":"Colegiul Naţional „Mihai Eminescu”","specializari":[{"nume":"Ştiinţe ale Naturii","total":52,"prag":9.12,"max":9.55,"medie":9.229,"densitatePrag":44,"densitatePragPct":84.6,"distributie":[{"media":9.55,"nr":1},{"media":9.52,"nr":2},{"media":9.4,"nr":2},{"media":9.37,"nr":1},{"media":9.35,"nr":2},{"media":9.32,"nr":2},{"media":9.3,"nr":1},{"media":9.27,"nr":2},{"media":9.25,"nr":4},{"media":9.22,"nr":7},{"media":9.2,"nr":6},{"media":9.17,"nr":6},{"media":9.15,"nr":9},{"media":9.12,"nr":7}]},{"nume":"Matematică-Informatică","total":104,"prag":9.1,"max":9.62,"medie":9.191,"densitatePrag":95,"densitatePragPct":91.3,"distributie":[{"media":9.62,"nr":1},{"media":9.45,"nr":1},{"media":9.4,"nr":3},{"media":9.35,"nr":2},{"media":9.32,"nr":2},{"media":9.3,"nr":3},{"media":9.27,"nr":9},{"media":9.25,"nr":5},{"media":9.22,"nr":10},{"media":9.2,"nr":10},{"media":9.17,"nr":12},{"media":9.15,"nr":8},{"media":9.12,"nr":21},{"media":9.1,"nr":17}]},{"nume":"Ştiinţe Sociale","total":26,"prag":9.05,"max":9.45,"medie":9.159,"densitatePrag":21,"densitatePragPct":80.8,"distributie":[{"media":9.45,"nr":1},{"media":9.4,"nr":1},{"media":9.37,"nr":1},{"media":9.35,"nr":2},{"media":9.25,"nr":2},{"media":9.22,"nr":1},{"media":9.17,"nr":1},{"media":9.15,"nr":2},{"media":9.1,"nr":4},{"media":9.07,"nr":4},{"media":9.05,"nr":7}]},{"nume":"Filologie","total":52,"prag":8.97,"max":9.35,"medie":9.036,"densitatePrag":51,"densitatePragPct":98.1,"distributie":[{"media":9.35,"nr":1},{"media":9.17,"nr":2},{"media":9.15,"nr":1},{"media":9.12,"nr":1},{"media":9.1,"nr":2},{"media":9.07,"nr":4},{"media":9.05,"nr":9},{"media":9.02,"nr":13},{"media":9.0,"nr":10},{"media":8.97,"nr":9}]}]},{"rank":19,"cod":"Colegiul Național „Ion Neculce”","nume":"Colegiul Național „Ion Neculce”","specializari":[{"nume":"Matematică-Informatică","total":78,"prag":9.07,"max":9.6,"medie":9.158,"densitatePrag":72,"densitatePragPct":92.3,"distributie":[{"media":9.6,"nr":1},{"media":9.52,"nr":1},{"media":9.47,"nr":1},{"media":9.37,"nr":1},{"media":9.35,"nr":1},{"media":9.32,"nr":1},{"media":9.27,"nr":2},{"media":9.25,"nr":2},{"media":9.22,"nr":5},{"media":9.2,"nr":5},{"media":9.17,"nr":8},{"media":9.15,"nr":8},{"media":9.12,"nr":13},{"media":9.1,"nr":13},{"media":9.07,"nr":16}]},{"nume":"Ştiinţe ale Naturii","total":26,"prag":9.1,"max":9.57,"medie":9.182,"densitatePrag":23,"densitatePragPct":88.5,"distributie":[{"media":9.57,"nr":1},{"media":9.37,"nr":1},{"media":9.32,"nr":1},{"media":9.27,"nr":1},{"media":9.25,"nr":1},{"media":9.22,"nr":1},{"media":9.2,"nr":1},{"media":9.17,"nr":5},{"media":9.15,"nr":4},{"media":9.12,"nr":4},{"media":9.1,"nr":6}]},{"nume":"Ştiinţe ale Naturii (bilingv italiană, fără examen)","total":26,"prag":8.97,"max":9.27,"medie":9.063,"densitatePrag":24,"densitatePragPct":92.3,"distributie":[{"media":9.27,"nr":1},{"media":9.2,"nr":1},{"media":9.17,"nr":1},{"media":9.15,"nr":2},{"media":9.12,"nr":2},{"media":9.1,"nr":1},{"media":9.07,"nr":2},{"media":9.05,"nr":6},{"media":9.02,"nr":1},{"media":9.0,"nr":6},{"media":8.97,"nr":3}]},{"nume":"Ştiinţe Sociale","total":26,"prag":8.97,"max":9.32,"medie":9.074,"densitatePrag":23,"densitatePragPct":88.5,"distributie":[{"media":9.32,"nr":1},{"media":9.27,"nr":1},{"media":9.25,"nr":1},{"media":9.12,"nr":5},{"media":9.1,"nr":2},{"media":9.07,"nr":3},{"media":9.05,"nr":3},{"media":9.02,"nr":2},{"media":9.0,"nr":4},{"media":8.97,"nr":4}]},{"nume":"Filologie","total":26,"prag":8.95,"max":9.07,"medie":8.977,"densitatePrag":26,"densitatePragPct":100.0,"distributie":[{"media":9.07,"nr":2},{"media":9.05,"nr":1},{"media":9.02,"nr":1},{"media":9.0,"nr":4},{"media":8.97,"nr":5},{"media":8.95,"nr":13}]},{"nume":"Filologie (bilingv italiană, fără examen)","total":26,"prag":8.87,"max":9.05,"medie":8.912,"densitatePrag":26,"densitatePragPct":100.0,"distributie":[{"media":9.05,"nr":1},{"media":8.97,"nr":2},{"media":8.95,"nr":3},{"media":8.92,"nr":5},{"media":8.9,"nr":7},{"media":8.87,"nr":8}]}]},{"rank":20,"cod":"Liceul Teoretic „Jean Monnet”","nume":"Liceul Teoretic „Jean Monnet”","specializari":[{"nume":"Matematică-Informatică","total":52,"prag":8.97,"max":9.77,"medie":9.197,"densitatePrag":32,"densitatePragPct":61.5,"distributie":[{"media":9.77,"nr":1},{"media":9.75,"nr":1},{"media":9.72,"nr":1},{"media":9.7,"nr":1},{"media":9.67,"nr":1},{"media":9.57,"nr":1},{"media":9.52,"nr":1},{"media":9.42,"nr":1},{"media":9.4,"nr":1},{"media":9.35,"nr":1},{"media":9.3,"nr":4},{"media":9.27,"nr":2},{"media":9.25,"nr":1},{"media":9.22,"nr":2},{"media":9.2,"nr":1},{"media":9.17,"nr":1},{"media":9.15,"nr":5},{"media":9.1,"nr":2},{"media":9.07,"nr":3},{"media":9.05,"nr":7},{"media":9.02,"nr":6},{"media":9.0,"nr":7},{"media":8.97,"nr":1}]},{"nume":"Ştiinţe ale Naturii","total":26,"prag":8.95,"max":9.87,"medie":9.109,"densitatePrag":19,"densitatePragPct":73.1,"distributie":[{"media":9.87,"nr":1},{"media":9.47,"nr":1},{"media":9.35,"nr":1},{"media":9.22,"nr":1},{"media":9.2,"nr":2},{"media":9.17,"nr":1},{"media":9.15,"nr":1},{"media":9.12,"nr":1},{"media":9.07,"nr":2},{"media":9.05,"nr":3},{"media":9.03,"nr":1},{"media":9.02,"nr":2},{"media":9.0,"nr":1},{"media":8.97,"nr":6},{"media":8.95,"nr":2}]},{"nume":"Ştiinţe Sociale","total":52,"prag":8.8,"max":9.72,"medie":8.935,"densitatePrag":43,"densitatePragPct":82.7,"distributie":[{"media":9.72,"nr":1},{"media":9.5,"nr":2},{"media":9.15,"nr":1},{"media":9.1,"nr":1},{"media":9.07,"nr":2},{"media":9.02,"nr":2},{"media":9.0,"nr":1},{"media":8.97,"nr":2},{"media":8.95,"nr":4},{"media":8.92,"nr":3},{"media":8.9,"nr":8},{"media":8.87,"nr":3},{"media":8.85,"nr":8},{"media":8.82,"nr":8},{"media":8.8,"nr":6}]}]},{"rank":21,"cod":"Liceul Teoretic „Ion Barbu”","nume":"Liceul Teoretic „Ion Barbu”","specializari":[{"nume":"Matematică-Informatică","total":52,"prag":8.95,"max":9.62,"medie":9.054,"densitatePrag":44,"densitatePragPct":84.6,"distributie":[{"media":9.62,"nr":1},{"media":9.27,"nr":1},{"media":9.25,"nr":1},{"media":9.22,"nr":2},{"media":9.2,"nr":2},{"media":9.17,"nr":1},{"media":9.15,"nr":1},{"media":9.12,"nr":2},{"media":9.1,"nr":1},{"media":9.07,"nr":5},{"media":9.05,"nr":4},{"media":9.02,"nr":10},{"media":9.0,"nr":6},{"media":8.97,"nr":9},{"media":8.95,"nr":6}]},{"nume":"Ştiinţe ale Naturii","total":52,"prag":8.87,"max":9.52,"medie":8.988,"densitatePrag":44,"densitatePragPct":84.6,"distributie":[{"media":9.52,"nr":1},{"media":9.4,"nr":1},{"media":9.3,"nr":2},{"media":9.25,"nr":1},{"media":9.22,"nr":1},{"media":9.12,"nr":2},{"media":9.07,"nr":2},{"media":9.05,"nr":3},{"media":9.02,"nr":2},{"media":9.0,"nr":4},{"media":8.97,"nr":3},{"media":8.95,"nr":4},{"media":8.92,"nr":4},{"media":8.9,"nr":10},{"media":8.87,"nr":12}]},{"nume":"Ştiinţe Sociale","total":52,"prag":8.7,"max":9.3,"medie":8.849,"densitatePrag":40,"densitatePragPct":76.9,"distributie":[{"media":9.3,"nr":1},{"media":9.22,"nr":2},{"media":9.17,"nr":2},{"media":9.12,"nr":1},{"media":9.05,"nr":1},{"media":8.95,"nr":1},{"media":8.92,"nr":4},{"media":8.9,"nr":5},{"media":8.87,"nr":2},{"media":8.85,"nr":6},{"media":8.82,"nr":1},{"media":8.77,"nr":4},{"media":8.75,"nr":8},{"media":8.72,"nr":11},{"media":8.7,"nr":3}]}]},{"rank":22,"cod":"Colegiul Național „Tudor Vladimirescu”","nume":"Colegiul Național „Tudor Vladimirescu”","specializari":[{"nume":"Matematică-Informatică","total":52,"prag":8.82,"max":9.6,"medie":8.983,"densitatePrag":37,"densitatePragPct":71.2,"distributie":[{"media":9.6,"nr":1},{"media":9.52,"nr":1},{"media":9.27,"nr":1},{"media":9.22,"nr":2},{"media":9.15,"nr":1},{"media":9.12,"nr":2},{"media":9.1,"nr":1},{"media":9.07,"nr":4},{"media":9.05,"nr":2},{"media":9.02,"nr":4},{"media":9.0,"nr":2},{"media":8.97,"nr":1},{"media":8.95,"nr":3},{"media":8.92,"nr":5},{"media":8.9,"nr":6},{"media":8.87,"nr":4},{"media":8.85,"nr":6},{"media":8.82,"nr":6}]},{"nume":"Ştiinţe ale Naturii","total":52,"prag":8.7,"max":9.27,"medie":8.846,"densitatePrag":40,"densitatePragPct":76.9,"distributie":[{"media":9.27,"nr":1},{"media":9.1,"nr":1},{"media":9.05,"nr":2},{"media":9.02,"nr":2},{"media":9.0,"nr":1},{"media":8.95,"nr":3},{"media":8.92,"nr":2},{"media":8.9,"nr":3},{"media":8.87,"nr":5},{"media":8.85,"nr":4},{"media":8.82,"nr":4},{"media":8.8,"nr":4},{"media":8.77,"nr":8},{"media":8.75,"nr":4},{"media":8.72,"nr":6},{"media":8.7,"nr":2}]},{"nume":"Filologie","total":26,"prag":8.6,"max":9.47,"medie":8.755,"densitatePrag":20,"densitatePragPct":76.9,"distributie":[{"media":9.47,"nr":1},{"media":9.12,"nr":1},{"media":8.97,"nr":1},{"media":8.92,"nr":2},{"media":8.85,"nr":1},{"media":8.8,"nr":2},{"media":8.75,"nr":1},{"media":8.72,"nr":2},{"media":8.7,"nr":1},{"media":8.67,"nr":2},{"media":8.65,"nr":4},{"media":8.62,"nr":7},{"media":8.6,"nr":1}]},{"nume":"Ştiinţe Sociale","total":78,"prag":8.5,"max":9.42,"medie":8.65,"densitatePrag":62,"densitatePragPct":79.5,"distributie":[{"media":9.42,"nr":1},{"media":9.35,"nr":1},{"media":9.07,"nr":1},{"media":9.02,"nr":1},{"media":8.95,"nr":1},{"media":8.92,"nr":1},{"media":8.9,"nr":1},{"media":8.87,"nr":1},{"media":8.85,"nr":3},{"media":8.8,"nr":1},{"media":8.77,"nr":1},{"media":8.75,"nr":1},{"media":8.72,"nr":2},{"media":8.7,"nr":2},{"media":8.67,"nr":3},{"media":8.65,"nr":7},{"media":8.62,"nr":5},{"media":8.6,"nr":12},{"media":8.57,"nr":7},{"media":8.55,"nr":9},{"media":8.52,"nr":9},{"media":8.5,"nr":8}]}]},{"rank":23,"cod":"Colegiul Economic „Virgil Madgearu”","nume":"Colegiul Economic „Virgil Madgearu”","specializari":[{"nume":"Turism şi alimentaţie","total":24,"prag":8.8,"max":9.2,"medie":8.955,"densitatePrag":16,"densitatePragPct":66.7,"distributie":[{"media":9.2,"nr":1},{"media":9.15,"nr":1},{"media":9.12,"nr":1},{"media":9.07,"nr":1},{"media":9.05,"nr":2},{"media":9.02,"nr":2},{"media":9.0,"nr":1},{"media":8.97,"nr":2},{"media":8.95,"nr":1},{"media":8.92,"nr":3},{"media":8.9,"nr":2},{"media":8.87,"nr":2},{"media":8.82,"nr":3},{"media":8.8,"nr":2}]},{"nume":"Economic","total":216,"prag":8.55,"max":9.7,"medie":8.793,"densitatePrag":126,"densitatePragPct":58.3,"distributie":[{"media":9.7,"nr":1},{"media":9.67,"nr":1},{"media":9.6,"nr":1},{"media":9.5,"nr":1},{"media":9.42,"nr":1},{"media":9.4,"nr":1},{"media":9.37,"nr":2},{"media":9.35,"nr":2},{"media":9.32,"nr":1},{"media":9.3,"nr":2},{"media":9.22,"nr":1},{"media":9.2,"nr":2},{"media":9.17,"nr":2},{"media":9.15,"nr":1},{"media":9.12,"nr":2},{"media":9.1,"nr":1},{"media":9.05,"nr":2},{"media":9.02,"nr":2},{"media":9.0,"nr":5},{"media":8.97,"nr":4},{"media":8.95,"nr":9},{"media":8.92,"nr":2},{"media":8.9,"nr":9},{"media":8.87,"nr":3},{"media":8.85,"nr":7},{"media":8.82,"nr":6},{"media":8.8,"nr":10},{"media":8.77,"nr":9},{"media":8.75,"nr":11},{"media":8.72,"nr":16},{"media":8.7,"nr":17},{"media":8.67,"nr":16},{"media":8.65,"nr":13},{"media":8.62,"nr":13},{"media":8.6,"nr":19},{"media":8.57,"nr":17},{"media":8.55,"nr":4}]}]},{"rank":24,"cod":"Liceul Teoretic „C.A. Rosetti”","nume":"Liceul Teoretic „C.A. Rosetti”","specializari":[{"nume":"Matematică-Informatică","total":78,"prag":8.8,"max":9.77,"medie":8.967,"densitatePrag":56,"densitatePragPct":71.8,"distributie":[{"media":9.77,"nr":1},{"media":9.27,"nr":2},{"media":9.25,"nr":1},{"media":9.17,"nr":3},{"media":9.15,"nr":2},{"media":9.12,"nr":3},{"media":9.07,"nr":7},{"media":9.05,"nr":1},{"media":9.02,"nr":2},{"media":9.0,"nr":3},{"media":8.97,"nr":4},{"media":8.95,"nr":6},{"media":8.92,"nr":14},{"media":8.9,"nr":8},{"media":8.87,"nr":4},{"media":8.85,"nr":4},{"media":8.82,"nr":8},{"media":8.8,"nr":5}]},{"nume":"Filologie","total":26,"prag":8.75,"max":9.02,"medie":8.845,"densitatePrag":22,"densitatePragPct":84.6,"distributie":[{"media":9.02,"nr":1},{"media":9.0,"nr":2},{"media":8.97,"nr":1},{"media":8.95,"nr":1},{"media":8.92,"nr":2},{"media":8.9,"nr":3},{"media":8.87,"nr":2},{"media":8.8,"nr":2},{"media":8.77,"nr":7},{"media":8.75,"nr":5}]},{"nume":"Ştiinţe ale Naturii","total":78,"prag":8.75,"max":9.22,"medie":8.862,"densitatePrag":62,"densitatePragPct":79.5,"distributie":[{"media":9.22,"nr":1},{"media":9.17,"nr":1},{"media":9.15,"nr":1},{"media":9.07,"nr":2},{"media":9.05,"nr":2},{"media":9.02,"nr":2},{"media":9.0,"nr":2},{"media":8.97,"nr":5},{"media":8.95,"nr":2},{"media":8.92,"nr":5},{"media":8.9,"nr":7},{"media":8.87,"nr":3},{"media":8.85,"nr":4},{"media":8.82,"nr":6},{"media":8.8,"nr":8},{"media":8.77,"nr":9},{"media":8.75,"nr":18}]}]},{"rank":25,"cod":"Liceul Teoretic „George Călinescu”","nume":"Liceul Teoretic „George Călinescu”","specializari":[{"nume":"Matematică-Informatică","total":78,"prag":8.77,"max":9.12,"medie":8.868,"densitatePrag":72,"densitatePragPct":92.3,"distributie":[{"media":9.12,"nr":1},{"media":9.1,"nr":1},{"media":9.05,"nr":1},{"media":9.02,"nr":3},{"media":8.97,"nr":2},{"media":8.95,"nr":5},{"media":8.92,"nr":7},{"media":8.9,"nr":10},{"media":8.87,"nr":5},{"media":8.85,"nr":15},{"media":8.82,"nr":4},{"media":8.8,"nr":12},{"media":8.77,"nr":12}]},{"nume":"Filologie","total":78,"prag":8.62,"max":9.02,"medie":8.706,"densitatePrag":73,"densitatePragPct":93.6,"distributie":[{"media":9.02,"nr":1},{"media":8.9,"nr":1},{"media":8.87,"nr":2},{"media":8.85,"nr":1},{"media":8.82,"nr":1},{"media":8.8,"nr":1},{"media":8.77,"nr":10},{"media":8.75,"nr":4},{"media":8.72,"nr":9},{"media":8.7,"nr":12},{"media":8.67,"nr":15},{"media":8.65,"nr":10},{"media":8.62,"nr":11}]}]},{"rank":26,"cod":"Liceul Teologic Adventist „Ştefan Demetrescu”","nume":"Liceul Teologic Adventist „Ştefan Demetrescu”","specializari":[{"nume":"Matematică-Informatică","total":26,"prag":8.67,"max":9.75,"medie":9.177,"densitatePrag":6,"densitatePragPct":23.1,"distributie":[{"media":9.75,"nr":1},{"media":9.67,"nr":3},{"media":9.65,"nr":1},{"media":9.62,"nr":1},{"media":9.47,"nr":1},{"media":9.4,"nr":1},{"media":9.37,"nr":1},{"media":9.32,"nr":1},{"media":9.22,"nr":1},{"media":9.2,"nr":1},{"media":9.17,"nr":1},{"media":9.15,"nr":1},{"media":9.02,"nr":1},{"media":9.0,"nr":2},{"media":8.97,"nr":1},{"media":8.95,"nr":1},{"media":8.9,"nr":1},{"media":8.87,"nr":1},{"media":8.75,"nr":2},{"media":8.72,"nr":1},{"media":8.67,"nr":2}]},{"nume":"Ştiinţe ale Naturii","total":26,"prag":8.37,"max":9.85,"medie":8.92,"densitatePrag":6,"densitatePragPct":23.1,"distributie":[{"media":9.85,"nr":1},{"media":9.67,"nr":1},{"media":9.47,"nr":1},{"media":9.45,"nr":1},{"media":9.42,"nr":1},{"media":9.32,"nr":1},{"media":9.12,"nr":1},{"media":9.1,"nr":1},{"media":9.0,"nr":2},{"media":8.95,"nr":1},{"media":8.92,"nr":1},{"media":8.9,"nr":1},{"media":8.87,"nr":2},{"media":8.77,"nr":1},{"media":8.7,"nr":1},{"media":8.67,"nr":1},{"media":8.65,"nr":1},{"media":8.6,"nr":1},{"media":8.5,"nr":1},{"media":8.47,"nr":1},{"media":8.45,"nr":1},{"media":8.42,"nr":2},{"media":8.37,"nr":1}]},{"nume":"Filologie","total":26,"prag":7.95,"max":9.32,"medie":8.415,"densitatePrag":10,"densitatePragPct":38.5,"distributie":[{"media":9.32,"nr":1},{"media":9.27,"nr":1},{"media":9.22,"nr":1},{"media":8.95,"nr":1},{"media":8.87,"nr":1},{"media":8.77,"nr":1},{"media":8.65,"nr":1},{"media":8.55,"nr":1},{"media":8.52,"nr":1},{"media":8.47,"nr":1},{"media":8.37,"nr":1},{"media":8.32,"nr":1},{"media":8.3,"nr":3},{"media":8.17,"nr":1},{"media":8.15,"nr":1},{"media":8.12,"nr":2},{"media":8.07,"nr":2},{"media":8.02,"nr":1},{"media":8.0,"nr":2},{"media":7.95,"nr":2}]}]},{"rank":27,"cod":"Colegiul Național „Emil Racoviță”","nume":"Colegiul Național „Emil Racoviță”","specializari":[{"nume":"Matematică-Informatică","total":26,"prag":8.62,"max":8.95,"medie":8.702,"densitatePrag":22,"densitatePragPct":84.6,"distributie":[{"media":8.95,"nr":1},{"media":8.9,"nr":1},{"media":8.85,"nr":2},{"media":8.77,"nr":2},{"media":8.72,"nr":1},{"media":8.7,"nr":2},{"media":8.67,"nr":6},{"media":8.65,"nr":7},{"media":8.62,"nr":4}]},{"nume":"Filologie","total":78,"prag":8.42,"max":9.27,"medie":8.555,"densitatePrag":66,"densitatePragPct":84.6,"distributie":[{"media":9.27,"nr":1},{"media":9.15,"nr":1},{"media":9.07,"nr":1},{"media":8.85,"nr":1},{"media":8.82,"nr":2},{"media":8.75,"nr":1},{"media":8.7,"nr":2},{"media":8.67,"nr":2},{"media":8.65,"nr":1},{"media":8.62,"nr":4},{"media":8.6,"nr":3},{"media":8.57,"nr":3},{"media":8.55,"nr":9},{"media":8.52,"nr":7},{"media":8.5,"nr":11},{"media":8.47,"nr":9},{"media":8.45,"nr":15},{"media":8.42,"nr":5}]}]},{"rank":28,"cod":"Colegiul Național „Școala Centrală”","nume":"Colegiul Național „Școala Centrală”","specializari":[{"nume":"Matematică-Informatică","total":78,"prag":9.05,"max":9.42,"medie":9.122,"densitatePrag":75,"densitatePragPct":96.2,"distributie":[{"media":9.42,"nr":1},{"media":9.27,"nr":2},{"media":9.25,"nr":2},{"media":9.22,"nr":2},{"media":9.2,"nr":7},{"media":9.17,"nr":6},{"media":9.15,"nr":8},{"media":9.12,"nr":10},{"media":9.1,"nr":10},{"media":9.07,"nr":13},{"media":9.05,"nr":17}]},{"nume":"Matematică-Informatică (bilingv franceză, cu examen)","total":26,"prag":8.6,"max":9.8,"medie":9.108,"densitatePrag":8,"densitatePragPct":30.8,"distributie":[{"media":9.8,"nr":1},{"media":9.75,"nr":1},{"media":9.72,"nr":1},{"media":9.67,"nr":1},{"media":9.55,"nr":1},{"media":9.52,"nr":1},{"media":9.47,"nr":1},{"media":9.45,"nr":1},{"media":9.37,"nr":1},{"media":9.27,"nr":1},{"media":9.25,"nr":1},{"media":9.02,"nr":1},{"media":9.0,"nr":1},{"media":8.97,"nr":1},{"media":8.92,"nr":1},{"media":8.9,"nr":1},{"media":8.87,"nr":1},{"media":8.85,"nr":1},{"media":8.8,"nr":1},{"media":8.77,"nr":1},{"media":8.72,"nr":1},{"media":8.7,"nr":1},{"media":8.67,"nr":1},{"media":8.6,"nr":3}]},{"nume":"Matematică-Informatică (bilingv franceză, fără examen)","total":26,"prag":8.92,"max":9.27,"medie":8.991,"densitatePrag":25,"densitatePragPct":96.2,"distributie":[{"media":9.27,"nr":1},{"media":9.12,"nr":1},{"media":9.1,"nr":1},{"media":9.05,"nr":1},{"media":9.02,"nr":3},{"media":9.0,"nr":2},{"media":8.97,"nr":5},{"media":8.95,"nr":9},{"media":8.92,"nr":3}]},{"nume":"Filologie","total":79,"prag":8.85,"max":9.15,"medie":8.93,"densitatePrag":75,"densitatePragPct":94.9,"distributie":[{"media":9.15,"nr":1},{"media":9.12,"nr":2},{"media":9.1,"nr":1},{"media":9.05,"nr":2},{"media":9.02,"nr":5},{"media":9.0,"nr":4},{"media":8.97,"nr":4},{"media":8.95,"nr":8},{"media":8.92,"nr":13},{"media":8.9,"nr":18},{"media":8.87,"nr":14},{"media":8.85,"nr":7}]},{"nume":"Filologie (bilingv franceză, cu examen)","total":26,"prag":8.4,"max":9.32,"medie":8.703,"densitatePrag":13,"densitatePragPct":50.0,"distributie":[{"media":9.32,"nr":1},{"media":9.17,"nr":1},{"media":9.1,"nr":1},{"media":9.07,"nr":1},{"media":9.0,"nr":1},{"media":8.92,"nr":1},{"media":8.9,"nr":1},{"media":8.82,"nr":1},{"media":8.8,"nr":1},{"media":8.72,"nr":1},{"media":8.67,"nr":2},{"media":8.65,"nr":1},{"media":8.57,"nr":3},{"media":8.52,"nr":1},{"media":8.5,"nr":4},{"media":8.47,"nr":3},{"media":8.42,"nr":1},{"media":8.4,"nr":1}]},{"nume":"Filologie (bilingv franceză, fără examen)","total":26,"prag":8.77,"max":9.22,"medie":8.835,"densitatePrag":25,"densitatePragPct":96.2,"distributie":[{"media":9.22,"nr":1},{"media":8.92,"nr":1},{"media":8.85,"nr":6},{"media":8.82,"nr":7},{"media":8.8,"nr":9},{"media":8.77,"nr":2}]}]},{"rank":29,"cod":"Liceul Teoretic „Ștefan Odobleja”","nume":"Liceul Teoretic „Ștefan Odobleja”","specializari":[{"nume":"Ştiinţe ale Naturii","total":26,"prag":8.55,"max":9.12,"medie":8.693,"densitatePrag":17,"densitatePragPct":65.4,"distributie":[{"media":9.12,"nr":1},{"media":8.92,"nr":2},{"media":8.9,"nr":1},{"media":8.82,"nr":2},{"media":8.77,"nr":3},{"media":8.7,"nr":2},{"media":8.67,"nr":2},{"media":8.62,"nr":1},{"media":8.6,"nr":3},{"media":8.57,"nr":5},{"media":8.55,"nr":4}]},{"nume":"Ştiinţe Sociale","total":26,"prag":8.4,"max":9.35,"medie":8.548,"densitatePrag":20,"densitatePragPct":76.9,"distributie":[{"media":9.35,"nr":1},{"media":8.87,"nr":1},{"media":8.7,"nr":1},{"media":8.67,"nr":1},{"media":8.65,"nr":1},{"media":8.62,"nr":1},{"media":8.57,"nr":2},{"media":8.52,"nr":3},{"media":8.5,"nr":1},{"media":8.47,"nr":4},{"media":8.45,"nr":4},{"media":8.42,"nr":5},{"media":8.4,"nr":1}]},{"nume":"Matematică-Informatică","total":78,"prag":8.37,"max":9.12,"medie":8.614,"densitatePrag":40,"densitatePragPct":51.3,"distributie":[{"media":9.12,"nr":1},{"media":9.07,"nr":1},{"media":8.92,"nr":2},{"media":8.9,"nr":2},{"media":8.85,"nr":4},{"media":8.82,"nr":3},{"media":8.8,"nr":3},{"media":8.77,"nr":2},{"media":8.75,"nr":2},{"media":8.7,"nr":2},{"media":8.67,"nr":2},{"media":8.65,"nr":4},{"media":8.62,"nr":5},{"media":8.6,"nr":5},{"media":8.57,"nr":2},{"media":8.55,"nr":7},{"media":8.52,"nr":3},{"media":8.5,"nr":6},{"media":8.47,"nr":11},{"media":8.45,"nr":3},{"media":8.42,"nr":3},{"media":8.4,"nr":4},{"media":8.37,"nr":1}]},{"nume":"Filologie","total":26,"prag":8.3,"max":8.57,"medie":8.373,"densitatePrag":25,"densitatePragPct":96.2,"distributie":[{"media":8.57,"nr":1},{"media":8.5,"nr":1},{"media":8.47,"nr":1},{"media":8.42,"nr":2},{"media":8.4,"nr":5},{"media":8.37,"nr":2},{"media":8.35,"nr":5},{"media":8.32,"nr":7},{"media":8.3,"nr":2}]}]},{"rank":30,"cod":"Colegiul Național „Victor Babeș”","nume":"Colegiul Național „Victor Babeș”","specializari":[{"nume":"Matematică-Informatică","total":26,"prag":8.5,"max":8.72,"medie":8.58,"densitatePrag":25,"densitatePragPct":96.2,"distributie":[{"media":8.72,"nr":1},{"media":8.7,"nr":1},{"media":8.67,"nr":3},{"media":8.65,"nr":1},{"media":8.62,"nr":3},{"media":8.6,"nr":2},{"media":8.57,"nr":2},{"media":8.55,"nr":5},{"media":8.52,"nr":3},{"media":8.5,"nr":5}]},{"nume":"Filologie","total":26,"prag":8.15,"max":8.77,"medie":8.378,"densitatePrag":16,"densitatePragPct":61.5,"distributie":[{"media":8.77,"nr":1},{"media":8.6,"nr":1},{"media":8.57,"nr":1},{"media":8.55,"nr":2},{"media":8.52,"nr":2},{"media":8.42,"nr":2},{"media":8.4,"nr":1},{"media":8.35,"nr":5},{"media":8.32,"nr":1},{"media":8.3,"nr":2},{"media":8.27,"nr":3},{"media":8.25,"nr":1},{"media":8.22,"nr":2},{"media":8.2,"nr":1},{"media":8.15,"nr":1}]},{"nume":"Ştiinţe Sociale","total":26,"prag":8.1,"max":9.07,"medie":8.309,"densitatePrag":17,"densitatePragPct":65.4,"distributie":[{"media":9.07,"nr":1},{"media":8.67,"nr":1},{"media":8.6,"nr":1},{"media":8.47,"nr":1},{"media":8.42,"nr":3},{"media":8.4,"nr":1},{"media":8.37,"nr":1},{"media":8.3,"nr":1},{"media":8.27,"nr":3},{"media":8.25,"nr":2},{"media":8.17,"nr":4},{"media":8.15,"nr":3},{"media":8.12,"nr":3},{"media":8.1,"nr":1}]},{"nume":"Ştiinţe ale Naturii","total":104,"prag":8.02,"max":9.02,"medie":8.34,"densitatePrag":35,"densitatePragPct":33.7,"distributie":[{"media":9.02,"nr":1},{"media":8.95,"nr":1},{"media":8.92,"nr":1},{"media":8.82,"nr":2},{"media":8.75,"nr":1},{"media":8.7,"nr":1},{"media":8.67,"nr":1},{"media":8.65,"nr":1},{"media":8.6,"nr":1},{"media":8.57,"nr":1},{"media":8.55,"nr":5},{"media":8.52,"nr":3},{"media":8.5,"nr":4},{"media":8.47,"nr":7},{"media":8.45,"nr":5},{"media":8.42,"nr":3},{"media":8.4,"nr":1},{"media":8.37,"nr":4},{"media":8.35,"nr":3},{"media":8.32,"nr":8},{"media":8.3,"nr":4},{"media":8.27,"nr":6},{"media":8.25,"nr":5},{"media":8.22,"nr":3},{"media":8.2,"nr":6},{"media":8.17,"nr":1},{"media":8.15,"nr":7},{"media":8.1,"nr":6},{"media":8.07,"nr":4},{"media":8.05,"nr":5},{"media":8.02,"nr":3}]}]}],"totalLicee":95,"totalNerepartizati":52,"dataExtragere":"2025-07-23","citywide":{"total":14953,"distributie":[{"media":10.0,"nr":32},{"media":9.97,"nr":22},{"media":9.95,"nr":44},{"media":9.92,"nr":44},{"media":9.9,"nr":75},{"media":9.87,"nr":64},{"media":9.86,"nr":1},{"media":9.85,"nr":78},{"media":9.82,"nr":87},{"media":9.81,"nr":1},{"media":9.8,"nr":79},{"media":9.78,"nr":1},{"media":9.77,"nr":84},{"media":9.76,"nr":2},{"media":9.75,"nr":102},{"media":9.72,"nr":108},{"media":9.7,"nr":107},{"media":9.68,"nr":1},{"media":9.67,"nr":97},{"media":9.65,"nr":116},{"media":9.63,"nr":2},{"media":9.62,"nr":112},{"media":9.6,"nr":117},{"media":9.58,"nr":1},{"media":9.57,"nr":109},{"media":9.56,"nr":2},{"media":9.55,"nr":123},{"media":9.52,"nr":107},{"media":9.5,"nr":138},{"media":9.48,"nr":2},{"media":9.47,"nr":95},{"media":9.46,"nr":1},{"media":9.45,"nr":123},{"media":9.43,"nr":1},{"media":9.42,"nr":110},{"media":9.4,"nr":130},{"media":9.38,"nr":1},{"media":9.37,"nr":97},{"media":9.36,"nr":3},{"media":9.35,"nr":127},{"media":9.32,"nr":126},{"media":9.3,"nr":106},{"media":9.28,"nr":1},{"media":9.27,"nr":132},{"media":9.25,"nr":108},{"media":9.23,"nr":3},{"media":9.22,"nr":118},{"media":9.21,"nr":2},{"media":9.2,"nr":125},{"media":9.18,"nr":1},{"media":9.17,"nr":115},{"media":9.16,"nr":1},{"media":9.15,"nr":105},{"media":9.13,"nr":2},{"media":9.12,"nr":150},{"media":9.11,"nr":1},{"media":9.1,"nr":111},{"media":9.08,"nr":3},{"media":9.07,"nr":112},{"media":9.06,"nr":1},{"media":9.05,"nr":111},{"media":9.03,"nr":2},{"media":9.02,"nr":107},{"media":9.0,"nr":103},{"media":8.98,"nr":5},{"media":8.97,"nr":98},{"media":8.95,"nr":110},{"media":8.93,"nr":2},{"media":8.92,"nr":112},{"media":8.91,"nr":2},{"media":8.9,"nr":133},{"media":8.88,"nr":1},{"media":8.87,"nr":92},{"media":8.85,"nr":108},{"media":8.83,"nr":1},{"media":8.82,"nr":89},{"media":8.81,"nr":2},{"media":8.8,"nr":87},{"media":8.78,"nr":1},{"media":8.77,"nr":106},{"media":8.76,"nr":2},{"media":8.75,"nr":96},{"media":8.73,"nr":1},{"media":8.72,"nr":105},{"media":8.7,"nr":93},{"media":8.67,"nr":100},{"media":8.66,"nr":1},{"media":8.65,"nr":90},{"media":8.62,"nr":96},{"media":8.61,"nr":1},{"media":8.6,"nr":94},{"media":8.57,"nr":98},{"media":8.56,"nr":1},{"media":8.55,"nr":108},{"media":8.52,"nr":87},{"media":8.51,"nr":2},{"media":8.5,"nr":99},{"media":8.48,"nr":1},{"media":8.47,"nr":111},{"media":8.45,"nr":87},{"media":8.43,"nr":1},{"media":8.42,"nr":95},{"media":8.41,"nr":2},{"media":8.4,"nr":74},{"media":8.38,"nr":1},{"media":8.37,"nr":90},{"media":8.36,"nr":2},{"media":8.35,"nr":101},{"media":8.33,"nr":2},{"media":8.32,"nr":92},{"media":8.31,"nr":1},{"media":8.3,"nr":97},{"media":8.28,"nr":1},{"media":8.27,"nr":98},{"media":8.25,"nr":83},{"media":8.22,"nr":77},{"media":8.2,"nr":99},{"media":8.18,"nr":2},{"media":8.17,"nr":67},{"media":8.15,"nr":73},{"media":8.12,"nr":78},{"media":8.11,"nr":1},{"media":8.1,"nr":82},{"media":8.07,"nr":69},{"media":8.05,"nr":85},{"media":8.03,"nr":2},{"media":8.02,"nr":75},{"media":8.01,"nr":1},{"media":8.0,"nr":90},{"media":7.97,"nr":73},{"media":7.96,"nr":2},{"media":7.95,"nr":81},{"media":7.92,"nr":66},{"media":7.91,"nr":2},{"media":7.9,"nr":67},{"media":7.87,"nr":62},{"media":7.86,"nr":1},{"media":7.85,"nr":81},{"media":7.82,"nr":80},{"media":7.81,"nr":3},{"media":7.8,"nr":84},{"media":7.78,"nr":1},{"media":7.77,"nr":68},{"media":7.76,"nr":1},{"media":7.75,"nr":74},{"media":7.72,"nr":67},{"media":7.7,"nr":67},{"media":7.67,"nr":58},{"media":7.65,"nr":77},{"media":7.63,"nr":1},{"media":7.62,"nr":68},{"media":7.61,"nr":1},{"media":7.6,"nr":73},{"media":7.57,"nr":59},{"media":7.55,"nr":73},{"media":7.52,"nr":66},{"media":7.51,"nr":1},{"media":7.5,"nr":74},{"media":7.47,"nr":51},{"media":7.45,"nr":68},{"media":7.42,"nr":67},{"media":7.41,"nr":1},{"media":7.4,"nr":61},{"media":7.37,"nr":56},{"media":7.35,"nr":63},{"media":7.32,"nr":70},{"media":7.3,"nr":48},{"media":7.27,"nr":70},{"media":7.25,"nr":79},{"media":7.23,"nr":1},{"media":7.22,"nr":52},{"media":7.2,"nr":62},{"media":7.17,"nr":63},{"media":7.15,"nr":64},{"media":7.12,"nr":51},{"media":7.1,"nr":51},{"media":7.08,"nr":1},{"media":7.07,"nr":57},{"media":7.05,"nr":66},{"media":7.02,"nr":58},{"media":7.01,"nr":1},{"media":7.0,"nr":47},{"media":6.97,"nr":60},{"media":6.95,"nr":45},{"media":6.93,"nr":2},{"media":6.92,"nr":48},{"media":6.9,"nr":43},{"media":6.87,"nr":43},{"media":6.85,"nr":51},{"media":6.82,"nr":64},{"media":6.8,"nr":41},{"media":6.77,"nr":46},{"media":6.76,"nr":1},{"media":6.75,"nr":48},{"media":6.72,"nr":40},{"media":6.7,"nr":47},{"media":6.68,"nr":2},{"media":6.67,"nr":60},{"media":6.65,"nr":49},{"media":6.62,"nr":42},{"media":6.61,"nr":1},{"media":6.6,"nr":46},{"media":6.57,"nr":48},{"media":6.55,"nr":51},{"media":6.52,"nr":41},{"media":6.51,"nr":1},{"media":6.5,"nr":56},{"media":6.47,"nr":49},{"media":6.45,"nr":43},{"media":6.42,"nr":55},{"media":6.4,"nr":42},{"media":6.37,"nr":47},{"media":6.35,"nr":44},{"media":6.32,"nr":50},{"media":6.3,"nr":45},{"media":6.28,"nr":1},{"media":6.27,"nr":32},{"media":6.25,"nr":41},{"media":6.22,"nr":44},{"media":6.2,"nr":53},{"media":6.17,"nr":28},{"media":6.15,"nr":43},{"media":6.13,"nr":1},{"media":6.12,"nr":40},{"media":6.1,"nr":44},{"media":6.07,"nr":47},{"media":6.05,"nr":44},{"media":6.02,"nr":36},{"media":6.0,"nr":36},{"media":5.97,"nr":36},{"media":5.95,"nr":42},{"media":5.92,"nr":38},{"media":5.9,"nr":47},{"media":5.87,"nr":39},{"media":5.85,"nr":29},{"media":5.82,"nr":30},{"media":5.8,"nr":35},{"media":5.77,"nr":40},{"media":5.75,"nr":33},{"media":5.72,"nr":32},{"media":5.7,"nr":35},{"media":5.67,"nr":32},{"media":5.65,"nr":31},{"media":5.62,"nr":40},{"media":5.6,"nr":34},{"media":5.57,"nr":28},{"media":5.55,"nr":35},{"media":5.52,"nr":23},{"media":5.5,"nr":38},{"media":5.47,"nr":32},{"media":5.45,"nr":36},{"media":5.42,"nr":40},{"media":5.4,"nr":37},{"media":5.37,"nr":39},{"media":5.35,"nr":36},{"media":5.32,"nr":26},{"media":5.31,"nr":1},{"media":5.3,"nr":28},{"media":5.27,"nr":23},{"media":5.25,"nr":37},{"media":5.22,"nr":21},{"media":5.2,"nr":30},{"media":5.17,"nr":29},{"media":5.15,"nr":37},{"media":5.12,"nr":32},{"media":5.1,"nr":35},{"media":5.07,"nr":31},{"media":5.05,"nr":31},{"media":5.02,"nr":25},{"media":5.0,"nr":32},{"media":4.97,"nr":23},{"media":4.95,"nr":24},{"media":4.92,"nr":18},{"media":4.9,"nr":23},{"media":4.87,"nr":22},{"media":4.85,"nr":27},{"media":4.82,"nr":26},{"media":4.8,"nr":18},{"media":4.77,"nr":12},{"media":4.75,"nr":22},{"media":4.72,"nr":15},{"media":4.7,"nr":24},{"media":4.67,"nr":29},{"media":4.65,"nr":21},{"media":4.62,"nr":25},{"media":4.6,"nr":22},{"media":4.57,"nr":19},{"media":4.55,"nr":25},{"media":4.52,"nr":17},{"media":4.5,"nr":23},{"media":4.47,"nr":16},{"media":4.45,"nr":23},{"media":4.42,"nr":18},{"media":4.4,"nr":23},{"media":4.37,"nr":24},{"media":4.35,"nr":11},{"media":4.32,"nr":25},{"media":4.3,"nr":17},{"media":4.27,"nr":19},{"media":4.25,"nr":24},{"media":4.22,"nr":15},{"media":4.2,"nr":23},{"media":4.17,"nr":12},{"media":4.15,"nr":13},{"media":4.12,"nr":9},{"media":4.1,"nr":15},{"media":4.07,"nr":18},{"media":4.05,"nr":21},{"media":4.02,"nr":20},{"media":4.0,"nr":20},{"media":3.97,"nr":17},{"media":3.95,"nr":18},{"media":3.92,"nr":14},{"media":3.9,"nr":11},{"media":3.87,"nr":14},{"media":3.85,"nr":17},{"media":3.82,"nr":6},{"media":3.8,"nr":12},{"media":3.77,"nr":4},{"media":3.75,"nr":10},{"media":3.72,"nr":15},{"media":3.7,"nr":10},{"media":3.67,"nr":11},{"media":3.65,"nr":9},{"media":3.62,"nr":12},{"media":3.6,"nr":9},{"media":3.57,"nr":9},{"media":3.55,"nr":9},{"media":3.52,"nr":8},{"media":3.5,"nr":5},{"media":3.47,"nr":7},{"media":3.45,"nr":6},{"media":3.42,"nr":4},{"media":3.4,"nr":9},{"media":3.37,"nr":3},{"media":3.35,"nr":9},{"media":3.32,"nr":8},{"media":3.3,"nr":5},{"media":3.27,"nr":11},{"media":3.25,"nr":6},{"media":3.22,"nr":4},{"media":3.2,"nr":8},{"media":3.17,"nr":4},{"media":3.15,"nr":5},{"media":3.12,"nr":5},{"media":3.1,"nr":8},{"media":3.07,"nr":3},{"media":3.05,"nr":5},{"media":3.02,"nr":1},{"media":3.0,"nr":1},{"media":2.97,"nr":3},{"media":2.95,"nr":2},{"media":2.92,"nr":1},{"media":2.9,"nr":3},{"media":2.87,"nr":3},{"media":2.85,"nr":2},{"media":2.82,"nr":1},{"media":2.8,"nr":3},{"media":2.77,"nr":2},{"media":2.72,"nr":4},{"media":2.7,"nr":2},{"media":2.67,"nr":1},{"media":2.65,"nr":1},{"media":2.6,"nr":3},{"media":2.57,"nr":3},{"media":2.5,"nr":2},{"media":2.47,"nr":3},{"media":2.4,"nr":3},{"media":2.37,"nr":1},{"media":2.35,"nr":1},{"media":2.32,"nr":1},{"media":2.1,"nr":1},{"media":2.05,"nr":2},{"media":1.92,"nr":1},{"media":1.75,"nr":1}]}}};

function fmt2(n) {
  return n.toFixed(2);
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;
  const p = payload[0].payload;
  return (
    <div className="tooltipBox">
      <div className="tooltipMedia">{fmt2(p.media)}</div>
      <div className="tooltipNr">{p.nr} candidat{p.nr === 1 ? "" : "i"}</div>
      {p.specNume && <div className="tooltipSpec">{p.specNume}</div>}
    </div>
  );
}

function normalizeName(s) {
  return (s || "")
    .replace(/[\u201E\u201D\u201C\u2018\u2019"']/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

// Checks the OTHER year's data for the same liceu+specializare and returns
// the match only if the threshold (prag) is identical to 2 decimals.
function findCrossYearMatch(liceuNume, specNume, currentPrag, currentYear) {
  const years = Object.keys(DATA_BY_YEAR);
  const otherYear = years.find((y) => y !== currentYear);
  if (!otherYear) return null;
  const otherLiceu = DATA_BY_YEAR[otherYear].licee.find(
    (l) => normalizeName(l.nume) === normalizeName(liceuNume)
  );
  if (!otherLiceu) return null;
  const otherSpec = otherLiceu.specializari.find((s) => s.nume === specNume);
  if (!otherSpec) return null;
  if (Math.abs(otherSpec.prag - currentPrag) < 0.001) {
    return { year: otherYear, prag: otherSpec.prag, nr: otherSpec.total };
  }
  return null;
}

function DistributieIstorica({ theme, focusLiceu, onFocusHandled }) {
  const [year, setYear] = useState("2025");
  const [selectedName, setSelectedName] = useState(DATA_BY_YEAR["2025"].licee[0].nume);
  const [specIdx, setSpecIdx] = useState(-1);
  const [query, setQuery] = useState("");
  const [percentileInput, setPercentileInput] = useState("");
  const pal = PALETTES[theme];

  const availableYears = Object.keys(DATA_BY_YEAR).sort((a, b) => b - a);
  const yearInfo = DATA_BY_YEAR[year];
  const DATA = yearInfo.licee;
  const cityData = yearInfo.citywide;

  function selectYear(y) {
    setYear(y);
    setSpecIdx(-1);
    setPercentileInput("");
    // selectedName is intentionally kept — same liceu stays selected across years
  }

  function selectLiceu(l) {
    setSelectedName(l.nume);
    setSpecIdx(-1);
    setPercentileInput("");
  }

  // When the Simulator tab sends us here for a specific school, pick the year
  // where that school actually has data (prefer 2025), select it, and clear the request.
  useEffect(() => {
    if (!focusLiceu) return;
    const years = Object.keys(DATA_BY_YEAR).sort((a, b) => b - a);
    const yearWithMatch = years.find((y) =>
      DATA_BY_YEAR[y].licee.some((l) => l.nume === focusLiceu)
    );
    if (yearWithMatch) setYear(yearWithMatch);
    setSelectedName(focusLiceu);
    setSpecIdx(-1);
    setPercentileInput("");
    onFocusHandled && onFocusHandled();
  }, [focusLiceu]);

  const filteredLicee = useMemo(() => {
    if (!query.trim()) return DATA;
    const q = query.trim().toLowerCase();
    return DATA.filter((l) => l.nume.toLowerCase().includes(q));
  }, [query, year, DATA]);

  const liceu =
    DATA.find((l) => normalizeName(l.nume) === normalizeName(selectedName)) || DATA[0];
  const liceuMissingThisYear = normalizeName(liceu.nume) !== normalizeName(selectedName);
  const specializari = liceu.specializari;

  const SPEC_COLORS = ["#C9A24B", "#5C7AA6", "#5B8C7B", "#B3312C", "#8B6F9E"];
  const specColor = (idx) => SPEC_COLORS[idx % SPEC_COLORS.length];
  const specColorMap = {};
  specializari.forEach((s, i) => { specColorMap[s.nume] = specColor(i); });

  const crossYearMatches = {};
  specializari.forEach((s) => {
    crossYearMatches[s.nume] = findCrossYearMatch(liceu.nume, s.nume, s.prag, year);
  });

  const isAll = specIdx === -1;

  const viewData = useMemo(() => {
    if (isAll) {
      const merged = [];
      specializari.forEach((s) => {
        s.distributie.forEach((d) => merged.push({ media: d.media, nr: d.nr, specNume: s.nume }));
      });
      merged.sort((a, b) => a.media - b.media);
      const total = merged.reduce((s, d) => s + d.nr, 0);
      const prag = Math.min(...specializari.map((s) => s.prag));
      const max = Math.max(...specializari.map((s) => s.max));
      const medie = total ? merged.reduce((s, d) => s + d.media * d.nr, 0) / total : 0;
      const pragSpec = specializari.find((s) => Math.abs(s.prag - prag) < 0.001);
      const dens = merged.filter((d) => d.media <= prag + 0.2001).reduce((s, d) => s + d.nr, 0);
      return {
        nume: "Tot liceul",
        total,
        prag,
        max,
        medie,
        pragSpecNume: pragSpec ? pragSpec.nume : "",
        densitatePrag: dens,
        densitatePragPct: total ? Math.round((dens / total) * 1000) / 10 : 0,
        distributie: merged,
      };
    }
    return specializari[Math.min(specIdx, specializari.length - 1)];
  }, [isAll, specIdx, liceu]);

  const chartData = viewData.distributie
    .slice()
    .sort((a, b) => a.media - b.media)
    .map((d) => ({ ...d, isPrag: Math.abs(d.media - viewData.prag) < 0.001 }));

  const totalLiceu = specializari.reduce((s, x) => s + x.total, 0);

  let percResult = null;
  if (!isAll && percentileInput !== "" && !isNaN(parseFloat(percentileInput))) {
    const val = parseFloat(percentileInput);
    const countAtOrAbove = viewData.distributie
      .filter((d) => d.media >= val)
      .reduce((s, d) => s + d.nr, 0);
    const pct = (countAtOrAbove / viewData.total) * 100;
    const admis = val >= viewData.prag;
    percResult = { val, countAtOrAbove, pct, admis };
  }

  function selectSpec(idx) {
    setSpecIdx(idx);
    setPercentileInput("");
  }

  // For every distinct grade actually present at the selected liceu/specializare,
  // find its position INTERVAL within the full Bucharest citywide ranking (not local rank).
  const classGradesCityPosition = useMemo(() => {
    const sortedDesc = viewData.distributie.slice().sort((a, b) => b.media - a.media);
    return sortedDesc.map((d) => {
      const above = cityData.distributie
        .filter((c) => c.media > d.media + 0.001)
        .reduce((s, c) => s + c.nr, 0);
      const atValue = cityData.distributie.find((c) => Math.abs(c.media - d.media) < 0.001);
      const cityNr = atValue ? atValue.nr : d.nr;
      return {
        media: d.media,
        nrAici: d.nr,
        specNume: d.specNume,
        cityPosStart: above + 1,
        cityPosEnd: above + cityNr,
        isPrag: Math.abs(d.media - viewData.prag) < 0.001,
      };
    });
  }, [viewData, cityData]);

  return (
    <div className="app">
      <style>{`
        * { box-sizing: border-box; }

        .app {
          display: flex;
          height: 100%;
          min-height: 640px;
          background: var(--ink);
          color: var(--text);
          font-family: 'Inter', system-ui, sans-serif;
          overflow: hidden;
          transition: background 0.2s, color 0.2s;
        }

        .themeToggle {
          display: flex;
          align-items: center;
          gap: 6px;
          background: var(--panel-raised);
          border: 1px solid var(--border);
          border-radius: 7px;
          padding: 5px 10px;
          font-size: 11px;
          color: var(--text-dim);
          cursor: pointer;
          font-family: 'Inter', sans-serif;
        }
        .themeToggle:hover { border-color: var(--gold); color: var(--text); }
        .themeToggle svg { width: 13px; height: 13px; }

        .yearRow {
          display: flex;
          gap: 6px;
          margin: 12px 0 6px;
        }
        .yearPill {
          background: var(--panel-raised);
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 4px 11px;
          font-size: 11.5px;
          font-family: 'JetBrains Mono', monospace;
          color: var(--text-dim);
          cursor: pointer;
        }
        .yearPill:hover { border-color: var(--gold); color: var(--text); }
        .yearPill.active {
          background: var(--gold);
          border-color: var(--gold);
          color: var(--ink);
          font-weight: 600;
        }

        .missingBanner {
          background: var(--accent-soft);
          border: 1px solid var(--accent);
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 12px;
          margin-bottom: 16px;
          line-height: 1.5;
        }

        .sidebar {
          width: 300px;
          min-width: 220px;
          background: var(--panel);
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
        }

        .sidebarHead {
          padding: 20px 18px 14px;
          border-bottom: 1px solid var(--border);
        }

        .sidebarEyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10.5px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--gold);
        }

        .sidebarTitle {
          font-family: 'Fraunces', serif;
          font-size: 21px;
          font-weight: 600;
          margin: 4px 0 2px;
          line-height: 1.15;
        }

        .sidebarSub {
          font-size: 11.5px;
          color: var(--text-dim);
        }

        .searchWrap {
          position: relative;
          margin: 12px 18px 8px;
        }

        .searchWrap input {
          width: 100%;
          background: var(--panel-raised);
          border: 1px solid var(--border);
          border-radius: 7px;
          padding: 7px 10px 7px 30px;
          color: var(--text);
          font-size: 12.5px;
          font-family: 'Inter', sans-serif;
          outline: none;
        }
        .searchWrap input:focus { border-color: var(--gold); }
        .searchWrap svg {
          position: absolute;
          left: 9px;
          top: 50%;
          transform: translateY(-50%);
          width: 14px;
          height: 14px;
          color: var(--text-faint);
        }

        .liceuList {
          flex: 1;
          overflow-y: auto;
          padding: 4px 10px 16px;
        }

        .liceuRow {
          display: flex;
          align-items: baseline;
          gap: 10px;
          width: 100%;
          text-align: left;
          background: none;
          border: none;
          padding: 9px 8px;
          border-radius: 7px;
          cursor: pointer;
          color: var(--text);
        }
        .liceuRow:hover { background: var(--panel-raised); }
        .liceuRow.active {
          background: var(--accent-soft);
          box-shadow: inset 2px 0 0 var(--accent);
        }

        .liceuRank {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: var(--text-faint);
          min-width: 20px;
        }
        .liceuRow.active .liceuRank { color: var(--gold); }

        .liceuMeta { flex: 1; min-width: 0; }
        .liceuName {
          font-size: 12.8px;
          line-height: 1.3;
          font-weight: 500;
        }
        .liceuPrag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10.5px;
          color: var(--text-dim);
          margin-top: 1px;
        }

        .main {
          flex: 1;
          overflow-y: auto;
          padding: 26px 34px 40px;
          min-width: 0;
        }

        .mainHead {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border);
          margin-bottom: 20px;
        }

        .mainHeadLeft { min-width: 0; }

        .mainRankBadge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10.5px;
          color: var(--gold);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        .mainTitle {
          font-family: 'Fraunces', serif;
          font-size: 27px;
          font-weight: 600;
          line-height: 1.15;
        }

        .mainCod {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: var(--text-faint);
          margin-top: 4px;
        }

        .mainTotalBox {
          text-align: right;
          flex-shrink: 0;
        }
        .mainTotalNum {
          font-family: 'JetBrains Mono', monospace;
          font-size: 26px;
          font-weight: 600;
          color: var(--text);
        }
        .mainTotalLabel {
          font-size: 10.5px;
          color: var(--text-dim);
          margin-top: 2px;
        }

        .tabRow {
          display: flex;
          gap: 8px;
          margin-bottom: 22px;
          flex-wrap: wrap;
        }

        .tabPill {
          background: var(--panel);
          border: 1px solid var(--border);
          border-radius: 999px;
          padding: 7px 14px;
          font-size: 12.5px;
          color: var(--text-dim);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 7px;
        }
        .tabPill:hover { border-color: var(--gold); color: var(--text); }
        .tabPill.active {
          background: var(--accent);
          border-color: var(--accent);
          color: #fff;
        }
        .tabPillPrag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          opacity: 0.8;
        }

        .statsGrid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }

        .statCard {
          background: var(--panel);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 14px 16px;
        }
        .statCard.highlight { border-color: var(--accent); background: var(--accent-soft); }

        .statIconRow {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--text-dim);
          font-size: 10.5px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 8px;
        }
        .statIconRow svg { width: 12px; height: 12px; }

        .statValue {
          font-family: 'JetBrains Mono', monospace;
          font-size: 21px;
          font-weight: 600;
        }
        .statSub {
          font-size: 10.8px;
          color: var(--text-dim);
          margin-top: 3px;
          line-height: 1.35;
        }

        .chartPanel {
          background: var(--panel);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 20px 20px 8px;
          margin-bottom: 24px;
        }

        .chartPanelHead {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 4px;
        }

        .chartTitle {
          font-family: 'Fraunces', serif;
          font-size: 15.5px;
          font-weight: 600;
        }

        .chartCaption {
          font-size: 11px;
          color: var(--text-dim);
          margin-bottom: 14px;
        }
        .chartCaption b { color: var(--accent); font-weight: 600; }

        .tooltipBox {
          background: var(--panel-raised);
          border: 1px solid var(--gold);
          border-radius: 6px;
          padding: 6px 10px;
        }
        .tooltipMedia {
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          font-weight: 600;
        }
        .tooltipNr { font-size: 10.5px; color: var(--text-dim); }
        .tooltipSpec {
          font-size: 10px;
          color: var(--gold);
          margin-top: 2px;
          border-top: 1px solid var(--border);
          padding-top: 3px;
        }

        .tabDot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .legendRow {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          margin: 2px 0 16px;
        }
        .legendItem {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: var(--text-dim);
        }
        .legendItem .tabDot { width: 8px; height: 8px; }
        .legendItem b { color: var(--text); font-family: 'JetBrains Mono', monospace; font-weight: 500; }

        .matchBadge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background: var(--gold);
          color: var(--ink);
          font-size: 10px;
          font-weight: 700;
          font-family: 'JetBrains Mono', monospace;
          cursor: help;
          flex-shrink: 0;
        }

        .percBox {
          background: var(--panel);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 18px 20px;
        }

        .percHead {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
        }
        .percHead svg { width: 14px; height: 14px; color: var(--gold); }
        .percTitle { font-family: 'Fraunces', serif; font-size: 15.5px; font-weight: 600; }
        .percCaption { font-size: 11px; color: var(--text-dim); margin-bottom: 14px; }

        .percInputRow {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
        }
        .percInputRow input {
          width: 100px;
          background: var(--panel-raised);
          border: 1px solid var(--border);
          border-radius: 7px;
          padding: 8px 10px;
          color: var(--text);
          font-family: 'JetBrains Mono', monospace;
          font-size: 15px;
          outline: none;
        }
        .percInputRow input:focus { border-color: var(--gold); }
        .percInputLabel { font-size: 12px; color: var(--text-dim); }

        .percResult {
          border-radius: 8px;
          padding: 12px 14px;
          font-size: 13px;
          line-height: 1.5;
        }
        .percResult.ok {
          background: var(--gold-soft);
          border: 1px solid var(--gold);
        }
        .percResult.no {
          background: var(--accent-soft);
          border: 1px solid var(--accent);
        }
        .percResult b { font-family: 'JetBrains Mono', monospace; }

        .posBox {
          background: var(--panel);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 18px 20px;
          margin-top: 20px;
        }
        .posHead { margin-bottom: 10px; }

        .posWarning {
          background: var(--accent-soft);
          border: 1px solid var(--accent);
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 12px;
          line-height: 1.55;
          margin-bottom: 16px;
        }

        .posTableWrap {
          max-height: 340px;
          overflow-y: auto;
          border: 1px solid var(--border);
          border-radius: 8px;
        }

        .posTable {
          width: 100%;
          border-collapse: collapse;
          font-size: 12.5px;
        }
        .posTable thead th {
          position: sticky;
          top: 0;
          background: var(--panel-raised);
          text-align: left;
          padding: 8px 12px;
          font-size: 10.5px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--text-dim);
          border-bottom: 1px solid var(--border);
        }
        .posTable tbody td {
          padding: 6px 12px;
          border-bottom: 1px solid var(--border);
        }
        .posTable tbody tr:last-child td { border-bottom: none; }
        .posMedia {
          font-family: 'JetBrains Mono', monospace;
          font-weight: 600;
        }
        .posRange {
          font-family: 'JetBrains Mono', monospace;
          color: var(--text-dim);
        }
        .posPragRow td { background: var(--accent-soft); }
        .posPragRow .posMedia, .posPragRow .posRange { color: var(--accent); font-weight: 600; }
        .posPragTag {
          margin-left: 8px;
          font-size: 9.5px;
          font-family: 'Inter', sans-serif;
          text-transform: uppercase;
          background: var(--accent);
          color: #fff;
          padding: 1px 6px;
          border-radius: 4px;
          font-weight: 700;
        }

        .footer {
          margin-top: 28px;
          padding-top: 16px;
          border-top: 1px solid var(--border);
          font-size: 10.8px;
          color: var(--text-faint);
          line-height: 1.6;
        }

        @media (max-width: 780px) {
          .app { flex-direction: column; height: auto; }
          .sidebar { width: 100%; max-height: 220px; }
          .statsGrid { grid-template-columns: repeat(2, 1fr); }
          .main { padding: 18px; }
        }
      `}</style>

      <div className="sidebar">
        <div className="sidebarHead">
          <div>
            <div className="sidebarEyebrow">Admitere · București</div>
            <div className="sidebarTitle">Top 30 licee</div>
          </div>
          <div className="yearRow">
            {availableYears.map((y) => (
              <button
                key={y}
                className={"yearPill" + (y === year ? " active" : "")}
                onClick={() => selectYear(y)}
              >
                {y}
              </button>
            ))}
          </div>
          <div className="sidebarSub">după pragul celei mai selective specializări · {yearInfo.totalLicee} licee cu repartizări</div>
        </div>
        <div className="searchWrap">
          <Search />
          <input
            placeholder="Caută liceu..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="liceuList">
          {filteredLicee.map((l, idx) => (
            <button
              key={l.cod}
              className={"liceuRow" + (normalizeName(l.nume) === normalizeName(selectedName) ? " active" : "")}
              onClick={() => selectLiceu(l)}
            >
              <span className="liceuRank">{String(l.rank).padStart(2, "0")}</span>
              <span className="liceuMeta">
                <div className="liceuName">{l.nume}</div>
                <div className="liceuPrag">prag max {fmt2(l.specializari[0].prag)}</div>
              </span>
            </button>
          ))}
          {filteredLicee.length === 0 && (
            <div style={{ padding: 16, fontSize: 12, color: "var(--text-faint)" }}>
              Niciun liceu găsit.
            </div>
          )}
        </div>
      </div>

      <div className="main">
        {liceuMissingThisYear && (
          <div className="missingBanner">
            <b>{selectedName}</b> nu apare în top 30 pentru {year} — afișăm în schimb rank #1 ({liceu.nume}). Alege alt liceu din listă sau schimbă anul înapoi.
          </div>
        )}
        <div className="mainHead">
          <div className="mainHeadLeft">
            <div className="mainRankBadge">
              <GraduationCap size={12} /> Rank #{liceu.rank} din {yearInfo.totalLicee} licee București · {year}
            </div>
            <div className="mainTitle">{liceu.nume}</div>
            <div className="mainCod">cod SIIIR {liceu.cod}</div>
          </div>
          <div className="mainTotalBox">
            <div className="mainTotalNum">{totalLiceu}</div>
            <div className="mainTotalLabel">candidați repartizați total</div>
          </div>
        </div>

        <div className="tabRow">
          <button
            className={"tabPill" + (isAll ? " active" : "")}
            onClick={() => selectSpec(-1)}
          >
            Tot liceul
            <span className="tabPillPrag">{specializari.length} specializări</span>
          </button>
          {specializari.map((s, idx) => (
            <button
              key={s.nume}
              className={"tabPill" + (idx === specIdx ? " active" : "")}
              onClick={() => selectSpec(idx)}
            >
              <span className="tabDot" style={{ background: specColor(idx) }} />
              {s.nume}
              <span className="tabPillPrag">{fmt2(s.prag)}</span>
              {crossYearMatches[s.nume] && (
                <span className="matchBadge" title={`Prag identic cu ${crossYearMatches[s.nume].year}: ${fmt2(crossYearMatches[s.nume].prag)}`}>
                  ≡
                </span>
              )}
            </button>
          ))}
        </div>

        {isAll && (
          <div className="legendRow">
            {specializari.map((s, idx) => (
              <div className="legendItem" key={s.nume}>
                <span className="tabDot" style={{ background: specColor(idx) }} />
                {s.nume} <b>{fmt2(s.prag)}</b>
                {crossYearMatches[s.nume] && (
                  <span className="matchBadge" title={`Prag identic cu ${crossYearMatches[s.nume].year}: ${fmt2(crossYearMatches[s.nume].prag)}`}>
                    ≡
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="statsGrid">
          <div className="statCard">
            <div className="statIconRow"><Users /> Candidați</div>
            <div className="statValue">{viewData.total}</div>
            <div className="statSub">
              {isAll ? "repartizați în tot liceul, etapa I" : "repartizați pe această specializare, etapa I"}
            </div>
          </div>
          <div className="statCard highlight">
            <div className="statIconRow"><Target /> {isAll ? "Cel mai accesibil prag" : "Prag (ultimul admis)"}</div>
            <div className="statValue">
              {fmt2(viewData.prag)}
              {(isAll ? crossYearMatches[viewData.pragSpecNume] : crossYearMatches[viewData.nume]) && (
                <span
                  className="matchBadge"
                  style={{ marginLeft: 8, verticalAlign: "middle" }}
                  title="Prag identic cu celălalt an — verificat la sursă, nu e o eroare de date"
                >
                  ≡
                </span>
              )}
            </div>
            <div className="statSub">
              {isAll ? <>la <b style={{ color: "var(--text)" }}>{viewData.pragSpecNume}</b></> : "cea mai mică medie de admitere înregistrată"}
              {(isAll ? crossYearMatches[viewData.pragSpecNume] : crossYearMatches[viewData.nume]) && (
                <> · identic cu {(isAll ? crossYearMatches[viewData.pragSpecNume] : crossYearMatches[viewData.nume]).year}</>
              )}
            </div>
          </div>
          <div className="statCard">
            <div className="statIconRow">Medie</div>
            <div className="statValue">{fmt2(viewData.medie)}</div>
            <div className="statSub">{isAll ? "media ponderată pe tot liceul" : "media aritmetică a mediilor de admitere"}</div>
          </div>
          {isAll ? (
            <div className="statCard">
              <div className="statIconRow">Interval</div>
              <div className="statValue">{fmt2(viewData.prag)}–{fmt2(viewData.max)}</div>
              <div className="statSub">de la cea mai accesibilă la cea mai selectivă specializare</div>
            </div>
          ) : (
            <div className="statCard">
              <div className="statIconRow"><TrendingDown /> Zonă de risc</div>
              <div className="statValue">{viewData.densitatePrag}</div>
              <div className="statSub">
                candidați intrați la mai puțin de 0.20p peste prag ({viewData.densitatePragPct}% din total)
              </div>
            </div>
          )}
        </div>

        <div className="chartPanel">
          <div className="chartPanelHead">
            <div className="chartTitle">Distribuția mediilor de admitere</div>
          </div>
          <div className="chartCaption">
            {isAll ? (
              <>Fiecare bară = candidații cu media exact indicată, colorați după specializare. Bara cu contur <b>roșu</b> marchează cel mai jos prag din liceu.</>
            ) : (
              <>Fiecare bară = candidații cu media exact indicată. Bara <b>roșie</b> marchează pragul (ultimul loc ocupat).</>
            )}
          </div>
          <ResponsiveContainer width="100%" height={340}>
            <BarChart data={chartData} margin={{ top: 20, right: 8, left: -12, bottom: 34 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={pal.border} vertical={false} />
              <XAxis
                dataKey="media"
                tickFormatter={fmt2}
                tick={{ fill: pal.textDim, fontSize: 10, fontFamily: "JetBrains Mono" }}
                axisLine={{ stroke: pal.border }}
                tickLine={false}
                interval={0}
                angle={-60}
                textAnchor="end"
                height={50}
              />
              <YAxis
                tick={{ fill: pal.textDim, fontSize: 10.5, fontFamily: "JetBrains Mono" }}
                axisLine={{ stroke: pal.border }}
                tickLine={false}
                width={28}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: pal.cursor }} />
              <Bar dataKey="nr" radius={[3, 3, 0, 0]}>
                <LabelList
                  dataKey="nr"
                  position="top"
                  style={{ fontFamily: "JetBrains Mono", fontSize: 10, fill: pal.textDim }}
                />
                {chartData.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={isAll ? specColorMap[entry.specNume] : (entry.isPrag ? pal.accent : pal.gold)}
                    stroke={entry.isPrag ? pal.accent : "none"}
                    strokeWidth={entry.isPrag ? 2 : 0}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="percBox">
          <div className="percHead">
            <Target />
            <div className="percTitle">Unde m-aș fi situat?</div>
          </div>
          {isAll ? (
            <div className="percCaption">
              Calculul de poziție e disponibil doar pe o specializare anume — repartizarea se face pe clasă/specializare, nu pe liceu ca întreg. Alege o specializare din listă mai sus.
            </div>
          ) : (
            <>
              <div className="percCaption">
                Introdu o medie de admitere și vezi cum s-ar fi clasat față de candidații reali din {year}, la {viewData.nume} — {liceu.nume}.
              </div>
              <div className="percInputRow">
                <input
                  type="number"
                  step="0.01"
                  min="1"
                  max="10"
                  placeholder="9.50"
                  value={percentileInput}
                  onChange={(e) => setPercentileInput(e.target.value)}
                />
                <span className="percInputLabel">medie de admitere</span>
              </div>
              {percResult && (
                <div className={"percResult " + (percResult.admis ? "ok" : "no")}>
                  {percResult.admis ? (
                    <>
                      Cu media <b>{fmt2(percResult.val)}</b>, te-ai fi clasat pe la poziția{" "}
                      <b>~{percResult.countAtOrAbove}</b> din <b>{viewData.total}</b> (în topul{" "}
                      <b>{percResult.pct.toFixed(1)}%</b> al celor repartizați aici).
                    </>
                  ) : (
                    <>
                      Cu media <b>{fmt2(percResult.val)}</b>, ai fi fost <b>sub pragul de admitere</b> ({fmt2(viewData.prag)})
                      la {viewData.nume} — {liceu.nume}, etapa I {year}. Nu ai fi fost repartizat aici.
                    </>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        <div className="posBox">
          <div className="posHead">
            <div className="percTitle">Mediile de aici — poziția lor pe tot Bucureștiul</div>
          </div>
          <div className="posWarning">
            Pentru fiecare medie apărută efectiv {isAll ? "la acest liceu" : `la ${viewData.nume}`}, arăt poziția ei în clasamentul complet pe tot Bucureștiul (cei {cityData.total} candidați repartizați în {year}) — nu poziția locală în școală/specializare.
            {" "}<b>Poziția NU e un câmp din sursă</b>, e derivată din note. La egalitate de medie (pe tot orașul, nu doar aici) dau interval, nu loc exact.
          </div>
          <div className="posTableWrap">
            <table className="posTable">
              <thead>
                <tr>
                  <th>Medie</th>
                  <th>Nr. aici{isAll ? " / specializare" : ""}</th>
                  <th>Poziție pe tot București (din {cityData.total})</th>
                </tr>
              </thead>
              <tbody>
                {classGradesCityPosition.map((r, i) => (
                  <tr key={i} className={r.isPrag ? "posPragRow" : ""}>
                    <td className="posMedia">{fmt2(r.media)}</td>
                    <td>
                      {r.nrAici}
                      {isAll && r.specNume && (
                        <span className="tabDot" style={{ background: specColorMap[r.specNume], marginLeft: 7, marginRight: 4 }} />
                      )}
                    </td>
                    <td className="posRange">
                      {r.cityPosStart === r.cityPosEnd ? r.cityPosStart : `${r.cityPosStart}–${r.cityPosEnd}`}
                      {r.isPrag && <span className="posPragTag">prag {isAll ? "liceu" : "aici"}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="footer">
          Sursă: tabela admitere_{year}, baza statulpa_scoli (conector aiparte.ro), extragere {yearInfo.dataExtragere}, etapa I, judet_repartizare = București.
          {" "}{yearInfo.totalNerepartizati} candidați au rămas nerepartizați în București la această etapă (excluși din acest tabel).
          Specializările combină clasele paralele cu aceeași denumire din același liceu.
          {" "}{year === "2024" && "2024 nu are cod SIIIR de liceu în sursă — gruparea s-a făcut după numele liceului. "}
          Media de admitere = media la Evaluarea Națională (medie_en), identică cu media de admitere conform datelor sursă — nu include media de absolvire a gimnaziului.
          Pragurile unui an nu se transferă direct la anul următor (cohortă, locuri și dificultate diferă).
        </div>
      </div>
    </div>
  );
}
// ===== SIMULATOR 2026 — la momentul fișei (poziție cunoscută) =====
// Bază reală 2025 (aiparte.ro/SIIIR): m=prag medie, pos=ultima poziție la admitere.
const DATA = [{"n":"Gheorghe Lazăr","t":"Colegiul Național","p":"Real","s":"Matematică-Informatică","b":null,"m":9.82,"pos":345,"pm":10.0,"l":84,"l5":78,"sec":"S5","r":1,"star":false},{"n":"Sfântul Sava","t":"Colegiul Național","p":"Real","s":"Științe ale Naturii","b":null,"m":9.82,"pos":362,"pm":10.0,"l":28,"l5":26,"sec":"S1","r":2,"star":false},{"n":"Sfântul Sava","t":"Colegiul Național","p":"Real","s":"Matematică-Informatică","b":"Limba engleză(cu examen)","m":9.82,"pos":378,"pm":10.0,"l":28,"l5":26,"sec":"S1","r":2,"star":false},{"n":"Gheorghe Lazăr","t":"Colegiul Național","p":"Real","s":"Științe ale Naturii","b":null,"m":9.8,"pos":455,"pm":10.0,"l":84,"l5":78,"sec":"S5","r":1,"star":false},{"n":"Spiru Haret","t":"Colegiul Național","p":"Real","s":"Matematică-Informatică","b":"Limba engleză(cu examen)","m":9.8,"pos":420,"pm":10.0,"l":28,"l5":26,"sec":"S2","r":3,"star":false},{"n":"Spiru Haret","t":"Colegiul Național","p":"Real","s":"Matematică-Informatică","b":null,"m":9.75,"pos":681,"pm":9.95,"l":56,"l5":52,"sec":"S2","r":3,"star":false},{"n":"Spiru Haret","t":"Colegiul Național","p":"Real","s":"Științe ale Naturii","b":null,"m":9.72,"pos":748,"pm":9.97,"l":56,"l5":52,"sec":"S2","r":3,"star":false},{"n":"Sfântul Sava","t":"Colegiul Național","p":"Real","s":"Matematică-Informatică","b":null,"m":9.72,"pos":800,"pm":10.0,"l":140,"l5":130,"sec":"S1","r":2,"star":false},{"n":"I.L.Caragiale","t":"Colegiul Național","p":"Real","s":"Matematică-Informatică","b":"Limba germană(cu examen)","m":9.72,"pos":810,"pm":10.0,"l":14,"l5":13,"sec":"S1","r":6,"star":false},{"n":"Tudor Vianu","t":"Colegiul Național de Informatică","p":"Real","s":"Matematică-Informatică","b":"Limba germană(fără examen)","m":9.67,"pos":957,"pm":10.0,"l":28,"l5":26,"sec":"S1","r":4,"star":false},{"n":"Gheorghe Lazăr","t":"Colegiul Național","p":"Umanist","s":"Științe Sociale","b":null,"m":9.65,"pos":1091,"pm":10.0,"l":56,"l5":52,"sec":"S5","r":1,"star":false},{"n":"Tudor Vianu","t":"Colegiul Național de Informatică","p":"Real","s":"Matematică-Informatică","b":null,"m":9.62,"pos":1244,"pm":10.0,"l":224,"l5":208,"sec":"S1","r":4,"star":false},{"n":"Tudor Vianu","t":"Colegiul Național de Informatică","p":"Real","s":"Științe ale Naturii","b":null,"m":9.62,"pos":1245,"pm":null,"l":28,"l5":null,"sec":"S1","r":4,"star":false},{"n":"Gheorghe Lazăr","t":"Colegiul Național","p":"Umanist","s":"Filologie","b":null,"m":9.62,"pos":1277,"pm":9.95,"l":28,"l5":26,"sec":"S5","r":1,"star":false},{"n":"Sfântul Sava","t":"Colegiul Național","p":"Umanist","s":"Filologie","b":null,"m":9.6,"pos":1398,"pm":10.0,"l":28,"l5":26,"sec":"S1","r":2,"star":false},{"n":"Grigore Moisil","t":"Colegiul Național","p":"Real","s":"Științe ale Naturii","b":null,"m":9.6,"pos":1440,"pm":9.9,"l":28,"l5":26,"sec":"S6","r":5,"star":false},{"n":"I.L.Caragiale","t":"Colegiul Național","p":"Real","s":"Matematică-Informatică","b":"Limba germană(fără examen)","m":9.6,"pos":1462,"pm":9.8,"l":14,"l5":13,"sec":"S1","r":6,"star":false},{"n":"I.L.Caragiale","t":"Colegiul Național","p":"Real","s":"Matematică-Informatică","b":"Limba engleză(cu examen)","m":9.6,"pos":1410,"pm":9.75,"l":28,"l5":26,"sec":"S1","r":6,"star":false},{"n":"Spiru Haret","t":"Colegiul Național","p":"Umanist","s":"Științe Sociale","b":null,"m":9.57,"pos":1533,"pm":9.85,"l":56,"l5":52,"sec":"S2","r":3,"star":false},{"n":"Matei Basarab","t":"Colegiul Național","p":"Real","s":"Științe ale Naturii","b":null,"m":9.55,"pos":1630,"pm":9.9,"l":56,"l5":52,"sec":"S3","r":8,"star":false},{"n":"Matei Basarab","t":"Colegiul Național","p":"Real","s":"Matematică-Informatică","b":null,"m":9.55,"pos":1658,"pm":9.9,"l":112,"l5":104,"sec":"S3","r":8,"star":false},{"n":"I.L.Caragiale","t":"Colegiul Național","p":"Real","s":"Științe ale Naturii","b":null,"m":9.55,"pos":1707,"pm":9.8,"l":28,"l5":26,"sec":"S1","r":6,"star":false},{"n":"Cantemir Vodă","t":"Colegiul Național","p":"Real","s":"Matematică-Informatică","b":"Limba engleză(cu examen)","m":9.55,"pos":1632,"pm":9.85,"l":28,"l5":26,"sec":"S2","r":12,"star":false},{"n":"Spiru Haret","t":"Colegiul Național","p":"Umanist","s":"Filologie","b":null,"m":9.52,"pos":1725,"pm":9.9,"l":28,"l5":26,"sec":"S2","r":3,"star":false},{"n":"Grigore Moisil","t":"Colegiul Național","p":"Real","s":"Matematică-Informatică","b":null,"m":9.52,"pos":1816,"pm":9.97,"l":84,"l5":78,"sec":"S6","r":5,"star":false},{"n":"Gheorghe Șincai","t":"Colegiul Național","p":"Real","s":"Științe ale Naturii","b":null,"m":9.52,"pos":1849,"pm":9.82,"l":56,"l5":52,"sec":"S4","r":9,"star":false},{"n":"Mihai Viteazul","t":"Colegiul Național","p":"Real","s":"Științe ale Naturii","b":null,"m":9.5,"pos":1877,"pm":10.0,"l":56,"l5":52,"sec":"S2","r":10,"star":false},{"n":"Matei Basarab","t":"Colegiul Național","p":"Umanist","s":"Științe Sociale","b":null,"m":9.47,"pos":2018,"pm":9.75,"l":84,"l5":26,"sec":"S3","r":8,"star":false},{"n":"I.L.Caragiale","t":"Colegiul Național","p":"Real","s":"Matematică-Informatică","b":null,"m":9.47,"pos":2043,"pm":9.77,"l":84,"l5":78,"sec":"S1","r":6,"star":false},{"n":"Gheorghe Șincai","t":"Colegiul Național","p":"Real","s":"Matematică-Informatică","b":null,"m":9.47,"pos":2090,"pm":9.95,"l":140,"l5":130,"sec":"S4","r":9,"star":false},{"n":"Iulia Hașdeu","t":"Colegiul Național","p":"Real","s":"Științe ale Naturii","b":null,"m":9.45,"pos":2254,"pm":9.82,"l":28,"l5":26,"sec":"S2","r":11,"star":false},{"n":"Iulia Hașdeu","t":"Colegiul Național","p":"Real","s":"Matematică-Informatică","b":"Limba engleză(cu examen)","m":9.45,"pos":2230,"pm":9.82,"l":28,"l5":26,"sec":"S2","r":11,"star":false},{"n":"Ion Creangă","t":"Colegiul Național","p":"Real","s":"Matematică-Informatică","b":"Limba engleză(cu examen)","m":9.45,"pos":2260,"pm":9.57,"l":28,"l5":26,"sec":"S4","r":13,"star":false},{"n":"I.L.Caragiale","t":"Colegiul Național","p":"Umanist","s":"Științe Sociale","b":null,"m":9.42,"pos":2354,"pm":9.6,"l":28,"l5":26,"sec":"S1","r":6,"star":false},{"n":"Matei Basarab","t":"Colegiul Național","p":"Umanist","s":"Filologie","b":null,"m":9.42,"pos":2368,"pm":9.7,"l":28,"l5":26,"sec":"S3","r":8,"star":false},{"n":"Mihai Viteazul","t":"Colegiul Național","p":"Real","s":"Matematică-Informatică","b":null,"m":9.4,"pos":2591,"pm":9.9,"l":224,"l5":208,"sec":"S2","r":10,"star":false},{"n":"Cantemir Vodă","t":"Colegiul Național","p":"Real","s":"Științe ale Naturii","b":null,"m":9.37,"pos":2684,"pm":9.67,"l":56,"l5":52,"sec":"S2","r":12,"star":false},{"n":"Ion Creangă","t":"Colegiul Național","p":"Real","s":"Matematică-Informatică","b":null,"m":9.37,"pos":2702,"pm":9.67,"l":56,"l5":52,"sec":"S4","r":13,"star":false},{"n":"Ion Creangă","t":"Colegiul Național","p":"Real","s":"Științe ale Naturii","b":null,"m":9.35,"pos":2848,"pm":9.77,"l":56,"l5":52,"sec":"S4","r":13,"star":false},{"n":"Grigore Moisil","t":"Colegiul Național","p":"Umanist","s":"Științe Sociale","b":null,"m":9.35,"pos":2875,"pm":9.67,"l":28,"l5":26,"sec":"S6","r":5,"star":false},{"n":"Iulia Hașdeu","t":"Colegiul Național","p":"Real","s":"Matematică-Informatică","b":null,"m":9.35,"pos":2876,"pm":9.8,"l":56,"l5":52,"sec":"S2","r":11,"star":false},{"n":"Cantemir Vodă","t":"Colegiul Național","p":"Real","s":"Matematică-Informatică","b":null,"m":9.35,"pos":2885,"pm":9.65,"l":112,"l5":104,"sec":"S2","r":12,"star":false},{"n":"Gheorghe Șincai","t":"Colegiul Național","p":"Umanist","s":"Filologie","b":null,"m":9.35,"pos":2927,"pm":9.7,"l":56,"l5":52,"sec":"S4","r":9,"star":false},{"n":"I.L.Caragiale","t":"Colegiul Național","p":"Umanist","s":"Filologie","b":"Limba engleză(cu examen)","m":9.35,"pos":2808,"pm":9.72,"l":28,"l5":26,"sec":"S1","r":6,"star":false},{"n":"Elena Cuza","t":"Colegiul Național","p":"Real","s":"Matematică-Informatică","b":null,"m":9.32,"pos":2962,"pm":9.72,"l":56,"l5":52,"sec":"S6","r":14,"star":false},{"n":"Nicolae Iorga","t":"Liceul Teoretic","p":"Real","s":"Matematică-Informatică","b":null,"m":9.3,"pos":3188,"pm":9.65,"l":56,"l5":52,"sec":"S1","r":15,"star":false},{"n":"I.L.Caragiale","t":"Colegiul Național","p":"Umanist","s":"Filologie","b":null,"m":9.3,"pos":3236,"pm":9.75,"l":28,"l5":26,"sec":"S1","r":6,"star":false},{"n":"Nicolae Iorga","t":"Liceul Teoretic","p":"Real","s":"Științe ale Naturii","b":"Limba engleză(cu examen)","m":9.3,"pos":3183,"pm":9.65,"l":28,"l5":26,"sec":"S1","r":15,"star":false},{"n":"Ion Creangă","t":"Colegiul Național","p":"Umanist","s":"Științe Sociale","b":null,"m":9.27,"pos":3255,"pm":9.5,"l":28,"l5":26,"sec":"S4","r":13,"star":false},{"n":"Mihai Eminescu","t":"Colegiul Național","p":"Real","s":"Științe ale Naturii","b":null,"m":9.27,"pos":3403,"pm":9.75,"l":56,"l5":52,"sec":"S4","r":16,"star":false},{"n":"Nicolae Iorga","t":"Liceul Teoretic","p":"Real","s":"Științe ale Naturii","b":null,"m":9.27,"pos":3406,"pm":9.55,"l":28,"l5":26,"sec":"S1","r":15,"star":false},{"n":"I.L.Caragiale","t":"Colegiul Național","p":"Umanist","s":"Filologie","b":"Limba germană(fără examen)","m":9.27,"pos":3410,"pm":9.48,"l":14,"l5":13,"sec":"S1","r":6,"star":false},{"n":"Iulia Hașdeu","t":"Colegiul Național","p":"Umanist","s":"Filologie","b":"Limba engleză(cu examen)","m":9.27,"pos":3291,"pm":9.65,"l":28,"l5":26,"sec":"S2","r":11,"star":false},{"n":"Grigore Moisil","t":"Colegiul Național","p":"Umanist","s":"Filologie","b":null,"m":9.25,"pos":3418,"pm":9.62,"l":28,"l5":26,"sec":"S6","r":5,"star":false},{"n":"Alexandru Ioan Cuza","t":"Liceul Teoretic","p":"Real","s":"Științe ale Naturii","b":null,"m":9.25,"pos":3430,"pm":9.57,"l":28,"l5":52,"sec":"S3","r":17,"star":false},{"n":"Mihai Eminescu","t":"Colegiul Național","p":"Real","s":"Matematică-Informatică","b":null,"m":9.25,"pos":3476,"pm":9.82,"l":112,"l5":104,"sec":"S4","r":16,"star":false},{"n":"Ion Neculce","t":"Colegiul Național","p":"Real","s":"Științe ale Naturii","b":null,"m":9.25,"pos":3492,"pm":9.9,"l":28,"l5":26,"sec":"S1","r":18,"star":true},{"n":"Alexandru Ioan Cuza","t":"Liceul Teoretic","p":"Real","s":"Matematică-Informatică","b":null,"m":9.22,"pos":3685,"pm":9.87,"l":112,"l5":130,"sec":"S3","r":17,"star":false},{"n":"Iulia Hașdeu","t":"Colegiul Național","p":"Umanist","s":"Filologie","b":null,"m":9.22,"pos":3702,"pm":9.62,"l":56,"l5":52,"sec":"S2","r":11,"star":false},{"n":"Ion Neculce","t":"Colegiul Național","p":"Real","s":"Matematică-Informatică","b":null,"m":9.22,"pos":3723,"pm":9.55,"l":84,"l5":78,"sec":"S1","r":18,"star":true},{"n":"Ion Creangă","t":"Colegiul Național","p":"Umanist","s":"Filologie","b":null,"m":9.2,"pos":3867,"pm":9.87,"l":56,"l5":52,"sec":"S4","r":13,"star":false},{"n":"Școala Centrală","t":"Colegiul Național","p":"Real","s":"Matematică-Informatică","b":null,"m":9.2,"pos":3875,"pm":9.5,"l":112,"l5":104,"sec":"S2","r":19,"star":false},{"n":"Mihai Eminescu","t":"Colegiul Național","p":"Umanist","s":"Științe Sociale","b":null,"m":9.17,"pos":3913,"pm":9.4,"l":28,"l5":52,"sec":"S4","r":16,"star":false},{"n":"Ion Neculce","t":"Colegiul Național","p":"Real","s":"Științe ale Naturii","b":"Limba italiană(fără examen)","m":9.17,"pos":3915,"pm":9.67,"l":28,"l5":26,"sec":"S1","r":18,"star":true},{"n":"Nicolae Iorga","t":"Liceul Teoretic","p":"Umanist","s":"Științe Sociale","b":null,"m":9.17,"pos":4007,"pm":9.3,"l":28,"l5":26,"sec":"S1","r":15,"star":false},{"n":"I.L.Caragiale","t":"Colegiul Național","p":"Umanist","s":"Filologie","b":"Limba germană(cu examen)","m":9.17,"pos":3933,"pm":9.57,"l":14,"l5":13,"sec":"S1","r":6,"star":false},{"n":"Școala Centrală","t":"Colegiul Național","p":"Real","s":"Matematică-Informatică","b":"Limba franceză(fără examan)","m":9.15,"pos":4090,"pm":9.32,"l":28,"l5":26,"sec":"S2","r":19,"star":false},{"n":"Miguel de Cervantes","t":"Liceul Teoretic Bilingv","p":"Real","s":"Matematică-Informatică","b":null,"m":9.15,"pos":4148,"pm":9.52,"l":28,"l5":26,"sec":"S1","r":20,"star":false},{"n":"Jean Monnet","t":"Liceul Teoretic","p":"Real","s":"Matematică-Informatică","b":null,"m":9.15,"pos":4155,"pm":9.65,"l":56,"l5":52,"sec":"S1","r":21,"star":false},{"n":"Mihai Eminescu","t":"Colegiul Național","p":"Umanist","s":"Filologie","b":null,"m":9.15,"pos":4180,"pm":9.4,"l":28,"l5":52,"sec":"S4","r":16,"star":false},{"n":"Ion Neculce","t":"Colegiul Național","p":"Umanist","s":"Științe Sociale","b":null,"m":9.12,"pos":4226,"pm":9.5,"l":28,"l5":26,"sec":"S1","r":18,"star":true},{"n":"Alexandru Ioan Cuza","t":"Liceul Teoretic","p":"Umanist","s":"Științe Sociale","b":null,"m":9.12,"pos":4247,"pm":9.62,"l":56,"l5":52,"sec":"S3","r":17,"star":false},{"n":"Nicolae Iorga","t":"Liceul Teoretic","p":"Umanist","s":"Filologie","b":null,"m":9.12,"pos":4328,"pm":9.3,"l":28,"l5":26,"sec":"S1","r":15,"star":false},{"n":"Jean Monnet","t":"Liceul Teoretic","p":"Real","s":"Științe ale Naturii","b":null,"m":9.1,"pos":4446,"pm":9.67,"l":28,"l5":52,"sec":"S1","r":21,"star":false},{"n":"Ion Barbu","t":"Liceul Teoretic","p":"Real","s":"Matematică-Informatică","b":null,"m":9.1,"pos":4491,"pm":9.45,"l":56,"l5":52,"sec":"S5","r":22,"star":false},{"n":"Ion Neculce","t":"Colegiul Național","p":"Umanist","s":"Filologie","b":null,"m":9.1,"pos":4493,"pm":9.47,"l":28,"l5":26,"sec":"S1","r":18,"star":true},{"n":"Elena Cuza","t":"Colegiul Național","p":"Umanist","s":"Filologie","b":"Limba engleză(cu examen)","m":9.1,"pos":4444,"pm":9.4,"l":28,"l5":26,"sec":"S6","r":14,"star":false},{"n":"Goethe","t":"Colegiul German","p":"Real","s":"Teor.real spec.germană","b":null,"m":9.08,"pos":4518,"pm":9.86,"l":28,"l5":25,"sec":"S1","r":23,"star":false},{"n":"Elena Cuza","t":"Colegiul Național","p":"Umanist","s":"Filologie","b":null,"m":9.07,"pos":4605,"pm":9.42,"l":28,"l5":26,"sec":"S6","r":14,"star":false},{"n":"Ion Neculce","t":"Colegiul Național","p":"Umanist","s":"Filologie","b":"Limba italiană(fără examen)","m":9.05,"pos":4685,"pm":9.6,"l":28,"l5":26,"sec":"S1","r":18,"star":true},{"n":"Ion Barbu","t":"Liceul Teoretic","p":"Real","s":"Științe ale Naturii","b":null,"m":9.05,"pos":4785,"pm":9.27,"l":56,"l5":52,"sec":"S5","r":22,"star":false},{"n":"Școala Centrală","t":"Colegiul Național","p":"Umanist","s":"Filologie","b":null,"m":9.02,"pos":4832,"pm":9.3,"l":84,"l5":78,"sec":"S2","r":19,"star":false},{"n":"Tudor Vladimirescu","t":"Liceul Teoretic","p":"Real","s":"Matematică-Informatică","b":null,"m":9.02,"pos":4857,"pm":9.72,"l":56,"l5":52,"sec":"S6","r":24,"star":false},{"n":"C.A. Rosetti","t":"Liceul Teoretic","p":"Real","s":"Matematică-Informatică","b":null,"m":9.02,"pos":4877,"pm":9.42,"l":84,"l5":78,"sec":"S2","r":25,"star":false},{"n":"Jean Monnet","t":"Liceul Teoretic","p":"Umanist","s":"Științe Sociale","b":null,"m":9.02,"pos":4942,"pm":9.4,"l":56,"l5":52,"sec":"S1","r":21,"star":false},{"n":"Miguel de Cervantes","t":"Liceul Teoretic Bilingv","p":"Umanist","s":"Filologie","b":null,"m":9.0,"pos":4971,"pm":9.47,"l":28,"l5":26,"sec":"S1","r":20,"star":false},{"n":"George Călinescu","t":"Liceul Teoretic","p":"Real","s":"Matematică-Informatică","b":null,"m":9.0,"pos":5023,"pm":9.2,"l":84,"l5":78,"sec":"S1","r":26,"star":false},{"n":"Școala Centrală","t":"Colegiul Național","p":"Umanist","s":"Filologie","b":"Limba franceză(fără examan)","m":9.0,"pos":5055,"pm":9.5,"l":28,"l5":26,"sec":"S2","r":19,"star":false},{"n":"Dante Alighieri","t":"Liceul Teoretic","p":"Real","s":"Științe ale Naturii","b":null,"m":8.97,"pos":5114,"pm":9.17,"l":28,"l5":26,"sec":"S3","r":27,"star":false},{"n":"C.A. Rosetti","t":"Liceul Teoretic","p":"Real","s":"Științe ale Naturii","b":null,"m":8.97,"pos":5133,"pm":9.4,"l":84,"l5":78,"sec":"S2","r":25,"star":false},{"n":"Dante Alighieri","t":"Liceul Teoretic","p":"Real","s":"Matematică-Informatică","b":null,"m":8.97,"pos":5172,"pm":9.72,"l":56,"l5":52,"sec":"S3","r":27,"star":false},{"n":"V. Madgearu","t":"Colegiul Economic","p":"Servicii","s":"Turism și alimentație","b":null,"m":8.97,"pos":5200,"pm":9.52,"l":28,"l5":24,"sec":"S1","r":28,"star":false},{"n":"C.A. Rosetti","t":"Liceul Teoretic","p":"Umanist","s":"Filologie","b":null,"m":8.97,"pos":5204,"pm":9.27,"l":28,"l5":26,"sec":"S2","r":25,"star":false},{"n":"Tudor Vladimirescu","t":"Liceul Teoretic","p":"Real","s":"Științe ale Naturii","b":null,"m":8.95,"pos":5347,"pm":9.4,"l":56,"l5":52,"sec":"S6","r":24,"star":false},{"n":"Emil Racoviță","t":"Colegiul Național","p":"Real","s":"Matematică-Informatică","b":null,"m":8.95,"pos":5356,"pm":9.15,"l":28,"l5":26,"sec":"S2","r":29,"star":false},{"n":"Școala Centrală","t":"Colegiul Național","p":"Real","s":"Matematică-Informatică","b":"Limba franceză(cu examen)","m":8.95,"pos":5322,"pm":9.52,"l":28,"l5":26,"sec":"S2","r":19,"star":false},{"n":"Ion Barbu","t":"Liceul Teoretic","p":"Umanist","s":"Științe Sociale","b":null,"m":8.92,"pos":5495,"pm":9.37,"l":56,"l5":78,"sec":"S5","r":22,"star":false},{"n":"Goethe","t":"Colegiul German","p":"Umanist","s":"Teor.uman.spec.germană","b":null,"m":8.9,"pos":5589,"pm":9.68,"l":28,"l5":25,"sec":"S1","r":23,"star":false},{"n":"Tudor Vladimirescu","t":"Liceul Teoretic","p":"Umanist","s":"Filologie","b":null,"m":8.87,"pos":5707,"pm":9.3,"l":28,"l5":26,"sec":"S6","r":24,"star":false},{"n":"George Călinescu","t":"Liceul Teoretic","p":"Umanist","s":"Filologie","b":null,"m":8.87,"pos":5729,"pm":9.07,"l":84,"l5":78,"sec":"S1","r":26,"star":false},{"n":"Dante Alighieri","t":"Liceul Teoretic","p":"Umanist","s":"Filologie","b":null,"m":8.87,"pos":5755,"pm":9.12,"l":28,"l5":26,"sec":"S3","r":27,"star":false},{"n":"Victor Babeș","t":"Colegiul Național","p":"Real","s":"Matematică-Informatică","b":null,"m":8.85,"pos":5805,"pm":9.1,"l":28,"l5":26,"sec":"S2","r":30,"star":false},{"n":"Ștefan Odobleja","t":"Liceul Teoretic","p":"Real","s":"Științe ale Naturii","b":null,"m":8.82,"pos":5939,"pm":9.22,"l":28,"l5":26,"sec":"S5","r":31,"star":false},{"n":"Alexandru Vlahuță","t":"Liceul Teoretic","p":"Umanist","s":"Filologie","b":null,"m":8.8,"pos":6071,"pm":9.05,"l":56,"l5":52,"sec":"S1","r":32,"star":false},{"n":"Tudor Vladimirescu","t":"Liceul Teoretic","p":"Umanist","s":"Științe Sociale","b":null,"m":8.8,"pos":6076,"pm":9.4,"l":56,"l5":78,"sec":"S6","r":24,"star":false},{"n":"V. Madgearu","t":"Colegiul Economic","p":"Servicii","s":"Economic","b":null,"m":8.8,"pos":6095,"pm":9.65,"l":252,"l5":216,"sec":"S1","r":28,"star":false},{"n":"Miguel de Cervantes","t":"Liceul Teoretic Bilingv","p":"Real","s":"Matematică-Informatică","b":"Limba spaniolă(cu examen)","m":8.8,"pos":6109,"pm":9.85,"l":28,"l5":26,"sec":"S1","r":20,"star":false},{"n":"Nicolae Kretzulescu","t":"Școala Superioară Comercială","p":"Servicii","s":"Comerț","b":null,"m":8.77,"pos":6189,"pm":9.25,"l":28,"l5":24,"sec":"S3","r":33,"star":false},{"n":"Alexandru Vlahuță","t":"Liceul Teoretic","p":"Umanist","s":"Filologie","b":"Limba germană(fără examen)","m":8.77,"pos":6220,"pm":9.2,"l":14,"l5":13,"sec":"S1","r":32,"star":false},{"n":"Ștefan Demetrescu","t":"Liceul Teologic Adventist","p":"Real","s":"Matematică-Informatică","b":null,"m":8.75,"pos":6269,"pm":9.57,"l":28,"l5":26,"sec":"S4","r":34,"star":false},{"n":"Nicolae Kretzulescu","t":"Școala Superioară Comercială","p":"Servicii","s":"Economic","b":null,"m":8.75,"pos":6365,"pm":9.4,"l":168,"l5":120,"sec":"S3","r":33,"star":false},{"n":"Școala Centrală","t":"Colegiul Național","p":"Umanist","s":"Filologie","b":"Limba franceză(cu examen)","m":8.75,"pos":6366,"pm":9.3,"l":28,"l5":26,"sec":"S2","r":19,"star":false},{"n":"C-tin Brâncoveanu","t":"Liceul Teoretic","p":"Real","s":"Matematică-Informatică","b":null,"m":8.72,"pos":6421,"pm":9.2,"l":56,"l5":52,"sec":"S1","r":35,"star":false},{"n":"Nicolae Kretzulescu","t":"Școala Superioară Comercială","p":"Servicii","s":"Turism și alimentație","b":null,"m":8.72,"pos":6452,"pm":9.37,"l":28,"l5":48,"sec":"S3","r":33,"star":false},{"n":"Aurel Vlaicu","t":"Colegiul Național","p":"Real","s":"Matematică-Informatică","b":null,"m":8.7,"pos":6541,"pm":9.17,"l":56,"l5":52,"sec":"S1","r":36,"star":false},{"n":"Emil Racoviță","t":"Colegiul Național","p":"Umanist","s":"Filologie","b":null,"m":8.7,"pos":6621,"pm":9.17,"l":28,"l5":78,"sec":"S2","r":29,"star":false},{"n":"Ștefan Odobleja","t":"Liceul Teoretic","p":"Umanist","s":"Științe Sociale","b":null,"m":8.67,"pos":6644,"pm":8.9,"l":28,"l5":26,"sec":"S5","r":31,"star":false},{"n":"Eugen Lovinescu","t":"Liceul Teoretic","p":"Real","s":"Matematică-Informatică","b":null,"m":8.67,"pos":6680,"pm":9.15,"l":84,"l5":78,"sec":"S6","r":37,"star":false},{"n":"Ștefan Odobleja","t":"Liceul Teoretic","p":"Real","s":"Matematică-Informatică","b":null,"m":8.65,"pos":6787,"pm":9.4,"l":84,"l5":78,"sec":"S5","r":31,"star":false},{"n":"Octav Onicescu","t":"Colegiul Național","p":"Real","s":"Matematică-Informatică","b":null,"m":8.65,"pos":6813,"pm":9.32,"l":112,"l5":104,"sec":"S4","r":38,"star":false},{"n":"Aurel Vlaicu","t":"Colegiul Național","p":"Real","s":"Științe ale Naturii","b":null,"m":8.62,"pos":6875,"pm":9.12,"l":56,"l5":52,"sec":"S1","r":36,"star":false},{"n":"Ștefan Odobleja","t":"Liceul Teoretic","p":"Umanist","s":"Filologie","b":null,"m":8.62,"pos":6881,"pm":9.22,"l":28,"l5":26,"sec":"S5","r":31,"star":false},{"n":"Marin Preda","t":"Liceul Teoretic","p":"Real","s":"Matematică-Informatică","b":null,"m":8.62,"pos":6945,"pm":9.37,"l":28,"l5":26,"sec":"S6","r":39,"star":false},{"n":"Alexandru Vlahuță","t":"Liceul Teoretic","p":"Umanist","s":"Filologie","b":"Limba germană(cu examen)","m":8.61,"pos":6988,"pm":9.1,"l":14,"l5":13,"sec":"S1","r":32,"star":false},{"n":"C-tin Brâncoveanu","t":"Liceul Teoretic","p":"Real","s":"Științe ale Naturii","b":null,"m":8.6,"pos":7018,"pm":9.7,"l":56,"l5":52,"sec":"S1","r":35,"star":false},{"n":"Sfântul Iosif","t":"Colegiul Romano-Catolic","p":"Real","s":"Științe ale Naturii","b":null,"m":8.6,"pos":7058,"pm":9.5,"l":28,"l5":26,"sec":"S4","r":40,"star":false},{"n":"Iulia Hașdeu","t":"Colegiul Național","p":"Umanist","s":"Filologie","b":"Limba spaniolă(cu examen)","m":8.6,"pos":7026,"pm":9.32,"l":28,"l5":26,"sec":"S2","r":11,"star":false},{"n":"Octav Onicescu","t":"Colegiul Național","p":"Umanist","s":"Științe Sociale","b":null,"m":8.57,"pos":7118,"pm":9.15,"l":56,"l5":52,"sec":"S4","r":38,"star":false},{"n":"Ștefan Demetrescu","t":"Liceul Teologic Adventist","p":"Real","s":"Științe ale Naturii","b":null,"m":8.57,"pos":7149,"pm":9.55,"l":28,"l5":26,"sec":"S4","r":34,"star":false},{"n":"Aurel Vlaicu","t":"Colegiul Național","p":"Umanist","s":"Filologie","b":null,"m":8.57,"pos":7167,"pm":8.92,"l":56,"l5":52,"sec":"S1","r":36,"star":false},{"n":"Benjamin Franklin","t":"Liceul Teoretic","p":"Real","s":"Matematică-Informatică","b":null,"m":8.57,"pos":7180,"pm":9.17,"l":56,"l5":52,"sec":"S3","r":41,"star":false},{"n":"Eugen Lovinescu","t":"Liceul Teoretic","p":"Umanist","s":"Filologie","b":null,"m":8.55,"pos":7271,"pm":8.9,"l":56,"l5":78,"sec":"S6","r":37,"star":false},{"n":"Ita Wegman","t":"Liceul Teoretic Bilingv","p":"Real","s":"Științe ale Naturii","b":"Limba germană(fără examen)","m":8.55,"pos":7307,"pm":9.47,"l":28,"l5":26,"sec":"S2","r":42,"star":false},{"n":"Marin Preda","t":"Liceul Teoretic","p":"Real","s":"Științe ale Naturii","b":null,"m":8.52,"pos":7359,"pm":9.1,"l":28,"l5":26,"sec":"S6","r":39,"star":false},{"n":"Octav Onicescu","t":"Colegiul Național","p":"Umanist","s":"Filologie","b":null,"m":8.52,"pos":7368,"pm":8.95,"l":56,"l5":52,"sec":"S4","r":38,"star":false},{"n":"Victor Babeș","t":"Colegiul Național","p":"Umanist","s":"Filologie","b":null,"m":8.52,"pos":7419,"pm":9.1,"l":28,"l5":26,"sec":"S2","r":30,"star":false},{"n":"Benjamin Franklin","t":"Liceul Teoretic","p":"Real","s":"Științe ale Naturii","b":null,"m":8.5,"pos":7502,"pm":9.12,"l":56,"l5":52,"sec":"S3","r":41,"star":false},{"n":"Eugen Lovinescu","t":"Liceul Teoretic","p":"Umanist","s":"Filologie","b":"Limba portugheză(fără examen)","m":8.5,"pos":7526,"pm":8.72,"l":28,"l5":26,"sec":"S6","r":37,"star":false},{"n":"Victor Babeș","t":"Colegiul Național","p":"Umanist","s":"Științe Sociale","b":null,"m":8.5,"pos":7579,"pm":8.95,"l":28,"l5":26,"sec":"S2","r":30,"star":false},{"n":"A.D.Xenopol","t":"Colegiul Economic","p":"Servicii","s":"Economic","b":null,"m":8.47,"pos":7613,"pm":9.65,"l":168,"l5":144,"sec":"S2","r":43,"star":false},{"n":"C-tin Brâncoveanu","t":"Liceul Teoretic","p":"Umanist","s":"Filologie","b":null,"m":8.47,"pos":7681,"pm":8.97,"l":56,"l5":52,"sec":"S1","r":35,"star":false},{"n":"Victor Babeș","t":"Colegiul Național","p":"Real","s":"Științe ale Naturii","b":null,"m":8.47,"pos":7682,"pm":9.35,"l":112,"l5":104,"sec":"S2","r":30,"star":false},{"n":"Miguel de Cervantes","t":"Liceul Teoretic Bilingv","p":"Umanist","s":"Filologie","b":"Limba spaniolă(cu examen)","m":8.47,"pos":7640,"pm":9.75,"l":28,"l5":26,"sec":"S1","r":20,"star":false},{"n":"Goethe","t":"Colegiul German","p":"Real","s":"Matematică-Informatică","b":"predare în limba germană","m":8.46,"pos":7716,"pm":9.58,"l":28,"l5":26,"sec":"S1","r":23,"star":false},{"n":"Ștefan Demetrescu","t":"Liceul Teologic Adventist","p":"Umanist","s":"Filologie","b":null,"m":8.45,"pos":7755,"pm":9.5,"l":28,"l5":26,"sec":"S4","r":34,"star":false},{"n":"C-tin Brâncoveanu","t":"Liceul Teoretic","p":"Umanist","s":"Științe Sociale","b":null,"m":8.45,"pos":7819,"pm":9.35,"l":56,"l5":52,"sec":"S1","r":35,"star":false},{"n":"A.D.Xenopol","t":"Colegiul Economic","p":"Servicii","s":"Turism și alimentație","b":null,"m":8.42,"pos":7899,"pm":9.02,"l":56,"l5":48,"sec":"S2","r":43,"star":false},{"n":"Ita Wegman","t":"Liceul Teoretic Bilingv","p":"Umanist","s":"Științe Sociale","b":"Limba germană(fără examen)","m":8.42,"pos":7928,"pm":9.3,"l":28,"l5":26,"sec":"S2","r":42,"star":false},{"n":"Marin Preda","t":"Liceul Teoretic","p":"Umanist","s":"Filologie","b":null,"m":8.4,"pos":7984,"pm":9.27,"l":28,"l5":26,"sec":"S6","r":39,"star":false},{"n":"Petru Maior","t":"Colegiul Tehnic","p":"Real","s":"Matematică-Informatică","b":null,"m":8.4,"pos":8012,"pm":8.65,"l":28,"l5":26,"sec":"S6","r":44,"star":false},{"n":"Mihail Sadoveanu","t":"Liceul Teoretic","p":"Umanist","s":"Științe Sociale","b":null,"m":8.37,"pos":8088,"pm":8.77,"l":56,"l5":78,"sec":"S2","r":45,"star":false},{"n":"Dimitrie Bolintineanu","t":"Liceul Teoretic","p":"Umanist","s":"Științe Sociale","b":null,"m":8.37,"pos":8134,"pm":9.45,"l":28,"l5":26,"sec":"S5","r":46,"star":false},{"n":"Mihail Sadoveanu","t":"Liceul Teoretic","p":"Real","s":"Matematică-Informatică","b":null,"m":8.35,"pos":8180,"pm":8.9,"l":84,"l5":78,"sec":"S2","r":45,"star":false},{"n":"Marin Preda","t":"Liceul Teoretic","p":"Umanist","s":"Științe Sociale","b":null,"m":8.35,"pos":8194,"pm":8.77,"l":56,"l5":52,"sec":"S6","r":39,"star":false},{"n":"Benjamin Franklin","t":"Liceul Teoretic","p":"Umanist","s":"Filologie","b":null,"m":8.35,"pos":8240,"pm":8.9,"l":56,"l5":78,"sec":"S3","r":41,"star":false},{"n":"Dimitrie Bolintineanu","t":"Liceul Teoretic","p":"Real","s":"Matematică-Informatică","b":null,"m":8.32,"pos":8303,"pm":8.7,"l":56,"l5":52,"sec":"S5","r":46,"star":false},{"n":"Costin C. Kirițescu","t":"Colegiul Economic","p":"Servicii","s":"Economic","b":null,"m":8.3,"pos":8347,"pm":9.35,"l":140,"l5":120,"sec":"S6","r":47,"star":false},{"n":"Costin C. Kirițescu","t":"Colegiul Economic","p":"Servicii","s":"Comerț","b":null,"m":8.2,"pos":8347,"pm":null,"l":28,"l5":null,"sec":"S6","r":47,"star":false},{"n":"Mihail Sadoveanu","t":"Liceul Teoretic","p":"Umanist","s":"Filologie","b":null,"m":8.3,"pos":8372,"pm":8.62,"l":28,"l5":52,"sec":"S2","r":45,"star":false},{"n":"Ioan N. Socolescu","t":"Colegiul Tehnic de Arhitectură și Lucrări Publice","p":"Real","s":"Matematică-Informatică","b":null,"m":8.3,"pos":8429,"pm":8.95,"l":28,"l5":26,"sec":"S1","r":48,"star":false},{"n":"Dimitrie Bolintineanu","t":"Liceul Teoretic","p":"Real","s":"Științe ale Naturii","b":null,"m":8.25,"pos":8548,"pm":9.05,"l":56,"l5":52,"sec":"S5","r":46,"star":false},{"n":"Dimitrie Bolintineanu","t":"Liceul Teoretic","p":"Umanist","s":"Filologie","b":null,"m":8.22,"pos":8638,"pm":8.6,"l":56,"l5":52,"sec":"S5","r":46,"star":false},{"n":"Petru Maior","t":"Colegiul Tehnic","p":"Umanist","s":"Științe Sociale","b":null,"m":8.22,"pos":8713,"pm":8.7,"l":28,"l5":26,"sec":"S6","r":44,"star":false},{"n":"Petru Maior","t":"Colegiul Tehnic","p":"Umanist","s":"Filologie","b":null,"m":8.22,"pos":8719,"pm":8.82,"l":56,"l5":26,"sec":"S6","r":44,"star":false},{"n":"Decebal","t":"Liceul Teoretic","p":"Real","s":"Matematică-Informatică","b":null,"m":8.2,"pos":8758,"pm":8.5,"l":28,"l5":26,"sec":"S3","r":49,"star":false},{"n":"Costin C. Kirițescu","t":"Colegiul Economic","p":"Servicii","s":"Turism și alimentație","b":null,"m":8.2,"pos":8777,"pm":8.7,"l":84,"l5":72,"sec":"S6","r":47,"star":false},{"n":"Mircea Eliade","t":"Liceul Cu Program Sportiv","p":"Real","s":"Științe ale Naturii","b":null,"m":8.17,"pos":8871,"pm":9.32,"l":28,"l5":26,"sec":"S6","r":50,"star":false},{"n":"Mircea Eliade","t":"Liceul Cu Program Sportiv","p":"Umanist","s":"Științe Sociale","b":null,"m":8.17,"pos":8877,"pm":8.7,"l":28,"l5":26,"sec":"S6","r":50,"star":false},{"n":"Decebal","t":"Liceul Teoretic","p":"Umanist","s":"Filologie","b":null,"m":8.0,"pos":9510,"pm":8.4,"l":84,"l5":52,"sec":"S3","r":49,"star":false},{"n":"Dante Alighieri","t":"Liceul Teoretic","p":"Umanist","s":"Filologie","b":"Limba italiană(cu examen)","m":8.0,"pos":9515,"pm":8.7,"l":28,"l5":26,"sec":"S3","r":27,"star":false},{"n":"Decebal","t":"Liceul Teoretic","p":"Umanist","s":"Filologie","b":"Limba engleză(cu examen)","m":7.97,"pos":9551,"pm":8.52,"l":28,"l5":26,"sec":"S3","r":49,"star":false},{"n":"Decebal","t":"Liceul Teoretic","p":"Umanist","s":"Științe Sociale","b":null,"m":7.92,"pos":9778,"pm":8.9,"l":84,"l5":104,"sec":"S3","r":49,"star":false},{"n":"Petru Maior","t":"Colegiul Tehnic","p":"Resurse naturale si Protecția mediului","s":"Protecția mediului","b":null,"m":7.9,"pos":9808,"pm":8.32,"l":28,"l5":48,"sec":"S6","r":44,"star":false},{"n":"Dante Alighieri","t":"Liceul Teoretic","p":"Real","s":"Matematică-Informatică","b":"Limba italiană(cu examen)","m":7.65,"pos":10570,"pm":8.95,"l":28,"l5":26,"sec":"S3","r":27,"star":false},{"n":"Ioan N. Socolescu","t":"Colegiul Tehnic de Arhitectură și Lucrări Publice","p":"Tehnic","s":"Construcții, instalații și lucrări publice","b":null,"m":7.37,"pos":11298,"pm":8.27,"l":28,"l5":48,"sec":"S1","r":48,"star":false},{"n":"Petru Maior","t":"Colegiul Tehnic","p":"Tehnic","s":"Electric","b":null,"m":7.02,"pos":12099,"pm":7.92,"l":28,"l5":48,"sec":"S6","r":44,"star":false},{"n":"Dante Alighieri","t":"Liceul Teoretic","p":"Real","s":"Științe ale Naturii","b":"predare în limba italiană","m":6.77,"pos":12618,"pm":9.11,"l":28,"l5":26,"sec":"S3","r":27,"star":false},{"n":"Petru Maior","t":"Colegiul Tehnic","p":"Tehnic","s":"Mecanică","b":null,"m":6.75,"pos":12664,"pm":7.37,"l":28,"l5":24,"sec":"S6","r":44,"star":false},{"n":"Goethe","t":"Colegiul German","p":"Umanist","s":"Filologie","b":"predare în limba germană","m":6.31,"pos":13462,"pm":9.15,"l":28,"l5":52,"sec":"S1","r":23,"star":false},{"n":"George Coșbuc","t":"Colegiul Național Bilingv","p":"Real","s":"Științe ale Naturii","b":"Limba engleză(cu examen)","m":9.57,"pos":1494,"pm":9.82,"l":28,"l5":26,"sec":"S2","r":7,"star":false},{"n":"George Coșbuc","t":"Colegiul Național Bilingv","p":"Real","s":"Matematică-Informatică","b":"Limba engleză(cu examen)","m":9.5,"pos":1932,"pm":9.82,"l":56,"l5":52,"sec":"S2","r":7,"star":false},{"n":"George Coșbuc","t":"Colegiul Național Bilingv","p":"Umanist","s":"Științe Sociale","b":"Limba engleză(cu examen)","m":9.47,"pos":2169,"pm":9.92,"l":28,"l5":26,"sec":"S2","r":7,"star":false},{"n":"George Coșbuc","t":"Colegiul Național Bilingv","p":"Umanist","s":"Filologie","b":"Limba engleză(cu examen)","m":9.3,"pos":3147,"pm":9.57,"l":56,"l5":52,"sec":"S2","r":7,"star":false},{"n":"Traian","t":"Liceul Teoretic","p":"Real","s":"Matematică-Informatică","b":null,"m":8.17,"pos":8903,"pm":8.6,"l":28,"l5":52,"sec":"S2","r":51,"star":false},{"n":"Nichita Stănescu","t":"Liceul Teoretic","p":"Real","s":"Matematică-Informatică","b":null,"m":8.17,"pos":8914,"pm":8.75,"l":56,"l5":52,"sec":"S3","r":52,"star":false},{"n":"Lucian Blaga","t":"Liceul Teoretic","p":"Real","s":"Matematică-Informatică","b":null,"m":8.17,"pos":8922,"pm":8.67,"l":28,"l5":26,"sec":"S2","r":53,"star":false},{"n":"Timotei Cipariu","t":"Liceul Greco-Catolic","p":"Real","s":"Matematică-Informatică","b":null,"m":8.1,"pos":9191,"pm":8.95,"l":56,"l5":52,"sec":"S6","r":54,"star":false},{"n":"Traian","t":"Liceul Teoretic","p":"Real","s":"Științe ale Naturii","b":null,"m":8.07,"pos":9224,"pm":8.9,"l":56,"l5":52,"sec":"S2","r":51,"star":false},{"n":"Lucian Blaga","t":"Liceul Teoretic","p":"Real","s":"Științe ale Naturii","b":null,"m":8.07,"pos":9280,"pm":8.57,"l":56,"l5":52,"sec":"S2","r":53,"star":false},{"n":"Lucian Blaga","t":"Liceul Teoretic","p":"Umanist","s":"Filologie","b":null,"m":8.05,"pos":9347,"pm":8.55,"l":28,"l5":26,"sec":"S2","r":53,"star":false},{"n":"Lucian Blaga","t":"Liceul Teoretic","p":"Umanist","s":"Științe Sociale","b":null,"m":8.05,"pos":9366,"pm":8.27,"l":56,"l5":52,"sec":"S2","r":53,"star":false},{"n":"Nichita Stănescu","t":"Liceul Teoretic","p":"Umanist","s":"Științe Sociale","b":null,"m":8.02,"pos":9377,"pm":8.7,"l":112,"l5":104,"sec":"S3","r":52,"star":false},{"n":"Traian","t":"Liceul Teoretic","p":"Umanist","s":"Filologie","b":null,"m":8.02,"pos":9385,"pm":8.5,"l":56,"l5":52,"sec":"S2","r":51,"star":false},{"n":"Hermes","t":"Colegiul Economic","p":"Servicii","s":"Economic","b":null,"m":8.02,"pos":9392,"pm":8.6,"l":140,"l5":120,"sec":"S2","r":55,"star":false},{"n":"Gheorghe Asachi","t":"Colegiul Tehnic","p":"Real","s":"Științe ale Naturii","b":null,"m":8.02,"pos":9426,"pm":8.52,"l":28,"l5":26,"sec":"S6","r":56,"star":false},{"n":"Traian","t":"Liceul Teoretic","p":"Umanist","s":"Științe Sociale","b":null,"m":8.0,"pos":9465,"pm":9.2,"l":56,"l5":52,"sec":"S2","r":51,"star":false},{"n":"Henri Coandă","t":"Colegiul Tehnic de Aeronautică","p":"Real","s":"Matematică-Informatică","b":null,"m":8.0,"pos":9500,"pm":8.52,"l":28,"l5":26,"sec":"S1","r":57,"star":false},{"n":"Hermes","t":"Colegiul Economic","p":"Servicii","s":"Turism și alimentație","b":null,"m":7.97,"pos":9618,"pm":8.32,"l":84,"l5":48,"sec":"S2","r":55,"star":false},{"n":"Henri Coandă","t":"Colegiul Tehnic de Aeronautică","p":"Umanist","s":"Filologie","b":null,"m":7.97,"pos":9627,"pm":8.45,"l":28,"l5":26,"sec":"S1","r":57,"star":false},{"n":"Gheorghe Asachi","t":"Colegiul Tehnic","p":"Umanist","s":"Științe Sociale","b":null,"m":7.95,"pos":9688,"pm":8.62,"l":56,"l5":52,"sec":"S6","r":56,"star":false},{"n":"Hermes","t":"Colegiul Economic","p":"Servicii","s":"Comerț","b":null,"m":7.92,"pos":9726,"pm":8.17,"l":56,"l5":24,"sec":"S2","r":55,"star":false},{"n":"Hristo Botev","t":"Liceul Teoretic Bulgar","p":"Umanist","s":"Filologie","b":null,"m":7.9,"pos":9843,"pm":8.15,"l":28,"l5":26,"sec":"S1","r":58,"star":false},{"n":"Mihai Bravu","t":"Colegiul Tehnic","p":"Real","s":"Științe ale Naturii","b":null,"m":7.87,"pos":9885,"pm":8.12,"l":56,"l5":26,"sec":"S3","r":59,"star":false},{"n":"Dimitrie Leonida","t":"Colegiul Tehnic","p":"Real","s":"Matematică-Informatică","b":null,"m":7.82,"pos":10042,"pm":8.97,"l":28,"l5":26,"sec":"S2","r":60,"star":false},{"n":"Costin D. Nenițescu","t":"Colegiul Tehnic","p":"Umanist","s":"Filologie","b":null,"m":7.82,"pos":10105,"pm":8.82,"l":28,"l5":26,"sec":"S3","r":61,"star":false},{"n":"Grigore Cerchez","t":"Colegiul Tehnologic","p":"Umanist","s":"Științe Sociale","b":null,"m":7.8,"pos":10116,"pm":8.42,"l":56,"l5":52,"sec":"S5","r":62,"star":false},{"n":"Grigore Cerchez","t":"Colegiul Tehnologic","p":"Real","s":"Științe ale Naturii","b":null,"m":7.8,"pos":10157,"pm":8.52,"l":28,"l5":26,"sec":"S5","r":62,"star":false},{"n":"Dinicu Golescu","t":"Colegiul Tehnic","p":"Umanist","s":"Filologie","b":null,"m":7.8,"pos":10174,"pm":8.02,"l":28,"l5":26,"sec":"S1","r":63,"star":false},{"n":"Media","t":"Colegiul Tehnic","p":"Umanist","s":"Filologie","b":null,"m":7.77,"pos":10203,"pm":8.27,"l":28,"l5":26,"sec":"S1","r":64,"star":false},{"n":"Costin D. Nenițescu","t":"Colegiul Tehnic","p":"Real","s":"Științe ale Naturii","b":null,"m":7.75,"pos":10269,"pm":8.35,"l":28,"l5":52,"sec":"S3","r":61,"star":false},{"n":"Costin D. Nenițescu","t":"Colegiul Tehnic","p":"Umanist","s":"Științe Sociale","b":null,"m":7.75,"pos":10276,"pm":8.22,"l":28,"l5":52,"sec":"S3","r":61,"star":false},{"n":"Sfântul Pantelimon","t":"Liceul Tehnologic","p":"Umanist","s":"Științe Sociale","b":null,"m":7.72,"pos":10342,"pm":8.2,"l":28,"l5":26,"sec":"S2","r":65,"star":false},{"n":"Mihai I","t":"Colegiul Tehnic Feroviar","p":"Real","s":"Matematică-Informatică","b":null,"m":7.72,"pos":10381,"pm":8.37,"l":28,"l5":26,"sec":"S1","r":66,"star":false},{"n":"Traian Vuia","t":"Liceul Tehnologic de Metrologie","p":"Real","s":"Matematică-Informatică","b":null,"m":7.67,"pos":10495,"pm":9.25,"l":28,"l5":26,"sec":"S4","r":67,"star":false},{"n":"Dimitrie Leonida","t":"Colegiul Tehnic","p":"Real","s":"Științe ale Naturii","b":null,"m":7.67,"pos":10496,"pm":8.17,"l":28,"l5":26,"sec":"S2","r":60,"star":false},{"n":"Sf. Antim Ivireanu","t":"Liceul Tehnologic","p":"Servicii","s":"Turism și alimentație","b":null,"m":7.65,"pos":10556,"pm":8.37,"l":56,"l5":72,"sec":"S6","r":68,"star":false},{"n":"Sfântul Pantelimon","t":"Liceul Tehnologic","p":"Real","s":"Științe ale Naturii","b":null,"m":7.65,"pos":10578,"pm":8.15,"l":28,"l5":26,"sec":"S2","r":65,"star":false},{"n":"Hristo Botev","t":"Liceul Teoretic Bulgar","p":"Umanist","s":"Filologie","b":"Limba neogreacă(fără examen)","m":7.65,"pos":10580,"pm":8.32,"l":14,"l5":13,"sec":"S1","r":58,"star":false},{"n":"Dimitrie Paciurea","t":"Liceul","p":"Umanist","s":"Filologie","b":null,"m":7.65,"pos":10590,"pm":8.27,"l":28,"l5":26,"sec":"S1","r":69,"star":false},{"n":"Traian Vuia","t":"Liceul Tehnologic de Metrologie","p":"Umanist","s":"Filologie","b":null,"m":7.62,"pos":10634,"pm":7.97,"l":56,"l5":26,"sec":"S4","r":67,"star":false},{"n":"Carol I","t":"Colegiul Tehnic","p":"Umanist","s":"Științe Sociale","b":null,"m":7.6,"pos":10698,"pm":8.12,"l":56,"l5":52,"sec":"S6","r":70,"star":false},{"n":"Gheorghe Airinei","t":"Colegiul Tehnic de Poștă și Telecomunicații","p":"Real","s":"Științe ale Naturii","b":null,"m":7.6,"pos":10700,"pm":8.1,"l":56,"l5":52,"sec":"S6","r":71,"star":false},{"n":"Traian Vuia","t":"Liceul Tehnologic de Metrologie","p":"Real","s":"Științe ale Naturii","b":null,"m":7.6,"pos":10735,"pm":8.3,"l":56,"l5":26,"sec":"S4","r":67,"star":false},{"n":"Grigore Cerchez","t":"Colegiul Tehnologic","p":"Servicii","s":"Economic","b":null,"m":7.55,"pos":10833,"pm":7.9,"l":28,"l5":48,"sec":"S5","r":62,"star":false},{"n":"Valter Mărăcineanu","t":"Colegiul Tehnic","p":"Umanist","s":"Filologie","b":null,"m":7.5,"pos":10953,"pm":8.32,"l":28,"l5":26,"sec":"S1","r":72,"star":false},{"n":"Theodor Pallady","t":"Liceul Tehnologic","p":"Umanist","s":"Filologie","b":null,"m":7.47,"pos":11050,"pm":8.22,"l":28,"l5":26,"sec":"S3","r":73,"star":false},{"n":"Carol I","t":"Colegiul Tehnic","p":"Real","s":"Științe ale Naturii","b":null,"m":7.47,"pos":11063,"pm":7.92,"l":28,"l5":26,"sec":"S6","r":70,"star":false},{"n":"Gheorghe Airinei","t":"Colegiul Tehnic de Poștă și Telecomunicații","p":"Umanist","s":"Științe Sociale","b":null,"m":7.45,"pos":11096,"pm":8.07,"l":84,"l5":78,"sec":"S6","r":71,"star":false},{"n":"Energetic","t":"Colegiul Tehnic","p":"Real","s":"Matematică-Informatică","b":null,"m":7.42,"pos":11142,"pm":8.37,"l":28,"l5":26,"sec":"S5","r":74,"star":false},{"n":"Dimitrie Gusti","t":"Liceul Tehnologic","p":"Umanist","s":"Științe Sociale","b":null,"m":7.42,"pos":11154,"pm":8.02,"l":56,"l5":52,"sec":"S5","r":75,"star":false},{"n":"Dimitrie Gusti","t":"Liceul Tehnologic","p":"Real","s":"Științe ale Naturii","b":null,"m":7.4,"pos":11204,"pm":7.85,"l":28,"l5":26,"sec":"S5","r":75,"star":false},{"n":"Constantin Brâncuși","t":"Liceul Tehnologic","p":"Servicii","s":"Economic","b":null,"m":7.37,"pos":11278,"pm":8.07,"l":56,"l5":48,"sec":"S2","r":76,"star":false},{"n":"Mihai Bravu","t":"Colegiul Tehnic","p":"Servicii","s":"Turism și alimentație","b":null,"m":7.37,"pos":11283,"pm":7.92,"l":140,"l5":72,"sec":"S3","r":59,"star":false},{"n":"Hristo Botev","t":"Liceul Teoretic Bulgar","p":"Umanist","s":"Filologie","b":"Limba rusă(fără examen)","m":7.3,"pos":11467,"pm":7.77,"l":14,"l5":13,"sec":"S1","r":58,"star":false},{"n":"Energetic","t":"Colegiul Tehnic","p":"Umanist","s":"Filologie","b":null,"m":7.25,"pos":11612,"pm":8.15,"l":56,"l5":52,"sec":"S5","r":74,"star":false},{"n":"Iuliu Maniu","t":"Colegiul Tehnic","p":"Real","s":"Științe ale Naturii","b":null,"m":7.22,"pos":11637,"pm":8.1,"l":28,"l5":26,"sec":"S6","r":77,"star":false},{"n":"Mihai I","t":"Colegiul Tehnic Feroviar","p":"Real","s":"Științe ale Naturii","b":null,"m":7.22,"pos":11649,"pm":7.85,"l":56,"l5":52,"sec":"S1","r":66,"star":false},{"n":"Dinicu Golescu","t":"Colegiul Tehnic","p":"Servicii","s":"Turism și alimentație","b":null,"m":7.2,"pos":11736,"pm":8.05,"l":56,"l5":48,"sec":"S1","r":63,"star":false},{"n":"Anghel Saligny","t":"Colegiul Tehnic","p":"Servicii","s":"Economic","b":null,"m":7.2,"pos":11738,"pm":8.1,"l":84,"l5":72,"sec":"S3","r":78,"star":false},{"n":"Hristo Botev","t":"Liceul Teoretic Bulgar","p":"Umanist","s":"Filologie","b":"Limba bulgară(fără examen)","m":7.15,"pos":11825,"pm":7.85,"l":14,"l5":13,"sec":"S1","r":58,"star":false},{"n":"Gheorghe Asachi","t":"Colegiul Tehnic","p":"Tehnic","s":"Producție media","b":null,"m":7.12,"pos":11895,"pm":7.92,"l":56,"l5":72,"sec":"S6","r":56,"star":false},{"n":"Constantin Brâncuși","t":"Liceul Tehnologic","p":"Servicii","s":"Turism și alimentație","b":null,"m":7.1,"pos":11930,"pm":8.05,"l":28,"l5":48,"sec":"S2","r":76,"star":false},{"n":"Gheorghe Airinei","t":"Colegiul Tehnic de Poștă și Telecomunicații","p":"Servicii","s":"Economic","b":null,"m":7.1,"pos":11952,"pm":8.62,"l":56,"l5":48,"sec":"S6","r":71,"star":false},{"n":"Iuliu Maniu","t":"Colegiul Tehnic","p":"Umanist","s":"Științe Sociale","b":null,"m":7.07,"pos":11981,"pm":8.02,"l":84,"l5":78,"sec":"S6","r":77,"star":false},{"n":"Dimitrie Leonida","t":"Colegiul Tehnic","p":"Resurse naturale si Protecția mediului","s":"Protecția mediului","b":null,"m":7.07,"pos":11982,"pm":7.75,"l":28,"l5":24,"sec":"S2","r":60,"star":false},{"n":"Anghel Saligny","t":"Colegiul Tehnic","p":"Resurse naturale si Protecția mediului","s":"Protecția mediului","b":null,"m":7.07,"pos":12021,"pm":7.62,"l":28,"l5":24,"sec":"S3","r":78,"star":false},{"n":"Nikola Tesla","t":"Liceul Tehnologic","p":"Servicii","s":"Economic","b":null,"m":6.97,"pos":12210,"pm":7.87,"l":56,"l5":72,"sec":"S2","r":79,"star":false},{"n":"Viilor","t":"Colegiul Economic","p":"Servicii","s":"Economic","b":null,"m":6.97,"pos":12224,"pm":8.02,"l":140,"l5":72,"sec":"S5","r":80,"star":false},{"n":"Gheorghe Airinei","t":"Colegiul Tehnic de Poștă și Telecomunicații","p":"Servicii","s":"Turism și alimentație","b":null,"m":6.92,"pos":12356,"pm":8.72,"l":56,"l5":48,"sec":"S6","r":71,"star":false},{"n":"Constantin Brâncuși","t":"Liceul Tehnologic","p":"Resurse naturale si Protecția mediului","s":"Protecția mediului","b":null,"m":6.87,"pos":12457,"pm":7.35,"l":28,"l5":24,"sec":"S2","r":76,"star":false},{"n":"Grigore Cerchez","t":"Colegiul Tehnologic","p":"Servicii","s":"Turism și alimentație","b":null,"m":6.82,"pos":12549,"pm":8.22,"l":84,"l5":72,"sec":"S5","r":62,"star":false},{"n":"Carol I","t":"Colegiul Tehnic","p":"Resurse naturale si Protecția mediului","s":"Protecția mediului","b":null,"m":6.8,"pos":12556,"pm":8.2,"l":28,"l5":48,"sec":"S6","r":70,"star":false},{"n":"Henri Coandă","t":"Colegiul Tehnic de Aeronautică","p":"Tehnic","s":"Mecanică","b":null,"m":6.75,"pos":12654,"pm":8.0,"l":84,"l5":48,"sec":"S1","r":57,"star":false},{"n":"Viaceslav Harnaj","t":"Colegiul Tehnologic","p":"Servicii","s":"Economic","b":null,"m":6.75,"pos":12665,"pm":8.35,"l":56,"l5":48,"sec":"S1","r":81,"star":false},{"n":"Hristo Botev","t":"Liceul Teoretic Bulgar","p":"Real","s":"Matematică-Informatică","b":"Limba bulgară(fără examen)","m":6.7,"pos":12759,"pm":7.92,"l":28,"l5":26,"sec":"S1","r":58,"star":false},{"n":"Nr. 1","t":"Liceul Economic","p":"Servicii","s":"Economic","b":null,"m":6.7,"pos":12761,"pm":8.35,"l":196,"l5":120,"sec":"S4","r":82,"star":false},{"n":"Traian Vuia","t":"Liceul Tehnologic de Metrologie","p":"Resurse naturale si Protecția mediului","s":"Protecția mediului","b":null,"m":6.67,"pos":12816,"pm":7.42,"l":28,"l5":24,"sec":"S4","r":67,"star":false},{"n":"Valter Mărăcineanu","t":"Colegiul Tehnic","p":"Servicii","s":"Turism și alimentație","b":null,"m":6.62,"pos":12928,"pm":7.65,"l":84,"l5":48,"sec":"S1","r":72,"star":false},{"n":"Nr. 1","t":"Liceul Economic","p":"Servicii","s":"Turism și alimentație","b":null,"m":6.6,"pos":12955,"pm":8.27,"l":56,"l5":48,"sec":"S4","r":82,"star":false},{"n":"Hristo Botev","t":"Liceul Teoretic Bulgar","p":"Umanist","s":"Filologie","b":"Limba rromani(fără examen)","m":6.6,"pos":12959,"pm":7.05,"l":14,"l5":13,"sec":"S1","r":58,"star":false},{"n":"Costin D. Nenițescu","t":"Colegiul Tehnic","p":"Tehnic","s":"Chimie industrială","b":null,"m":6.55,"pos":13079,"pm":8.27,"l":84,"l5":96,"sec":"S3","r":61,"star":false},{"n":"Anghel Saligny","t":"Colegiul Tehnic","p":"Tehnic","s":"Construcții, instalații și lucrări publice","b":null,"m":6.5,"pos":13148,"pm":8.02,"l":84,"l5":24,"sec":"S3","r":78,"star":false},{"n":"Dimitrie Leonida","t":"Colegiul Tehnic","p":"Tehnic","s":"Electronică automatizări","b":null,"m":6.43,"pos":13260,"pm":8.15,"l":0,"l5":24,"sec":"S2","r":60,"star":false},{"n":"Energetic","t":"Colegiul Tehnic","p":"Servicii","s":"Turism și alimentație","b":null,"m":6.4,"pos":13333,"pm":7.62,"l":56,"l5":48,"sec":"S5","r":74,"star":false},{"n":"Ady Endre","t":"Liceul Teoretic","p":"Real","s":"Științe ale Naturii","b":"predare în limba maghiară","m":6.38,"pos":13347,"pm":9.01,"l":28,"l5":26,"sec":"S2","r":83,"star":false},{"n":"Gheorghe Asachi","t":"Colegiul Tehnic","p":"Tehnic","s":"Industrie textilă și pielărie","b":null,"m":6.35,"pos":13427,"pm":7.9,"l":56,"l5":48,"sec":"S6","r":56,"star":false},{"n":"Dragomir Hurmuzescu","t":"Liceul Tehnologic","p":"Servicii","s":"Economic","b":null,"m":6.32,"pos":13449,"pm":7.3,"l":112,"l5":72,"sec":"S3","r":84,"star":false},{"n":"Traian Vuia","t":"Liceul Tehnologic de Metrologie","p":"Tehnic","s":"Electric","b":null,"m":6.27,"pos":13547,"pm":7.57,"l":28,"l5":24,"sec":"S4","r":67,"star":false},{"n":"Gheorghe Airinei","t":"Colegiul Tehnic de Poștă și Telecomunicații","p":"Tehnic","s":"Electronică automatizări","b":null,"m":6.25,"pos":13560,"pm":8.8,"l":56,"l5":48,"sec":"S6","r":71,"star":false},{"n":"Nikola Tesla","t":"Liceul Tehnologic","p":"Resurse naturale si Protecția mediului","s":"Protecția mediului","b":null,"m":6.22,"pos":13611,"pm":8.37,"l":28,"l5":24,"sec":"S2","r":79,"star":false},{"n":"Costin D. Nenițescu","t":"Colegiul Tehnic","p":"Resurse naturale si Protecția mediului","s":"Industrie alimentară","b":null,"m":6.2,"pos":13661,"pm":7.2,"l":28,"l5":48,"sec":"S3","r":61,"star":false},{"n":"Ion I.C. Brătianu","t":"Liceul Tehnologic","p":"Servicii","s":"Turism și alimentație","b":null,"m":6.15,"pos":13741,"pm":7.27,"l":84,"l5":72,"sec":"S2","r":85,"star":false},{"n":"Viilor","t":"Colegiul Economic","p":"Servicii","s":"Comerț","b":null,"m":6.12,"pos":13780,"pm":7.45,"l":56,"l5":48,"sec":"S5","r":80,"star":false},{"n":"Viaceslav Harnaj","t":"Colegiul Tehnologic","p":"Servicii","s":"Turism și alimentație","b":null,"m":6.1,"pos":13798,"pm":8.57,"l":56,"l5":48,"sec":"S1","r":81,"star":false},{"n":"Dragomir Hurmuzescu","t":"Liceul Tehnologic","p":"Servicii","s":"Comerț","b":null,"m":6.02,"pos":13908,"pm":7.05,"l":28,"l5":24,"sec":"S3","r":84,"star":false},{"n":"Costin D. Nenițescu","t":"Colegiul Tehnic","p":"Resurse naturale si Protecția mediului","s":"Protecția mediului","b":null,"m":6.02,"pos":13923,"pm":7.5,"l":28,"l5":96,"sec":"S3","r":61,"star":false},{"n":"Viilor","t":"Colegiul Economic","p":"Servicii","s":"Turism și alimentație","b":null,"m":6.0,"pos":13952,"pm":8.77,"l":252,"l5":192,"sec":"S5","r":80,"star":false},{"n":"Traian Vuia","t":"Liceul Tehnologic de Metrologie","p":"Tehnic","s":"Electronică automatizări","b":null,"m":5.92,"pos":14055,"pm":6.87,"l":28,"l5":24,"sec":"S4","r":67,"star":false},{"n":"Henri Coandă","t":"Colegiul Tehnic de Aeronautică","p":"Tehnic","s":"Electromecanică","b":null,"m":5.85,"pos":14134,"pm":8.05,"l":84,"l5":96,"sec":"S1","r":57,"star":false},{"n":"Grigore Cerchez","t":"Colegiul Tehnologic","p":"Tehnic","s":"Mecanică","b":null,"m":5.82,"pos":14183,"pm":8.07,"l":28,"l5":24,"sec":"S5","r":62,"star":false},{"n":"Iuliu Maniu","t":"Colegiul Tehnic","p":"Servicii","s":"Turism și alimentație","b":null,"m":5.8,"pos":14228,"pm":7.72,"l":56,"l5":48,"sec":"S6","r":77,"star":false},{"n":"Costin D. Nenițescu","t":"Colegiul Tehnic","p":"Tehnic","s":"Electric","b":null,"m":5.7,"pos":14356,"pm":7.07,"l":0,"l5":48,"sec":"S3","r":61,"star":false},{"n":"Carol I","t":"Colegiul Tehnic","p":"Tehnic","s":"Electronică automatizări","b":null,"m":5.67,"pos":14387,"pm":7.6,"l":28,"l5":24,"sec":"S6","r":70,"star":false},{"n":"Sfântul Pantelimon","t":"Liceul Tehnologic","p":"Tehnic","s":"Mecanică","b":null,"m":5.65,"pos":14414,"pm":7.6,"l":28,"l5":48,"sec":"S2","r":65,"star":false},{"n":"Nikola Tesla","t":"Liceul Tehnologic","p":"Tehnic","s":"Electric","b":null,"m":5.62,"pos":14446,"pm":6.95,"l":56,"l5":24,"sec":"S2","r":79,"star":false},{"n":"Mircea cel Bătrân","t":"Colegiul Tehnic","p":"Servicii","s":"Economic","b":null,"m":5.6,"pos":14488,"pm":7.62,"l":112,"l5":120,"sec":"S1","r":86,"star":false},{"n":"Elie Radu","t":"Liceul Tehnologic","p":"Servicii","s":"Economic","b":null,"m":5.4,"pos":14689,"pm":7.32,"l":112,"l5":96,"sec":"S3","r":87,"star":false},{"n":"Dragomir Hurmuzescu","t":"Liceul Tehnologic","p":"Servicii","s":"Estetica și igiena corpului omenesc","b":null,"m":5.4,"pos":14692,"pm":7.15,"l":84,"l5":72,"sec":"S3","r":84,"star":false},{"n":"Dacia","t":"Liceul Tehnologic","p":"Resurse naturale si Protecția mediului","s":"Protecția mediului","b":null,"m":5.32,"pos":14770,"pm":6.42,"l":28,"l5":24,"sec":"S4","r":88,"star":false},{"n":"Iuliu Maniu","t":"Colegiul Tehnic","p":"Tehnic","s":"Electric","b":null,"m":5.3,"pos":14772,"pm":6.9,"l":28,"l5":24,"sec":"S6","r":77,"star":false},{"n":"Nikola Tesla","t":"Liceul Tehnologic","p":"Tehnic","s":"Electronică automatizări","b":null,"m":5.3,"pos":14795,"pm":8.0,"l":28,"l5":24,"sec":"S2","r":79,"star":false},{"n":"Ion I.C. Brătianu","t":"Liceul Tehnologic","p":"Tehnic","s":"Electric","b":null,"m":5.27,"pos":14808,"pm":7.42,"l":28,"l5":24,"sec":"S2","r":85,"star":false},{"n":"Mihai Bravu","t":"Colegiul Tehnic","p":"Tehnic","s":"Construcții, instalații și lucrări publice","b":null,"m":5.12,"pos":14976,"pm":6.9,"l":126,"l5":72,"sec":"S3","r":59,"star":false},{"n":"Mihai Bravu","t":"Colegiul Tehnic","p":"Tehnic","s":"Electric","b":null,"m":5.12,"pos":14980,"pm":6.92,"l":42,"l5":24,"sec":"S3","r":59,"star":false},{"n":"Constantin Brâncuși","t":"Liceul Tehnologic","p":"Tehnic","s":"Fabricarea produselor din lemn","b":null,"m":5.12,"pos":14981,"pm":7.22,"l":56,"l5":72,"sec":"S2","r":76,"star":false},{"n":"Petru Poni","t":"Liceul Tehnologic","p":"Tehnic","s":"Mecanică","b":null,"m":5.1,"pos":15008,"pm":6.65,"l":56,"l5":24,"sec":"S6","r":89,"star":false},{"n":"Energetic","t":"Colegiul Tehnic","p":"Tehnic","s":"Electric","b":null,"m":5.02,"pos":15040,"pm":7.67,"l":56,"l5":48,"sec":"S5","r":74,"star":false},{"n":"Mihai I","t":"Colegiul Tehnic Feroviar","p":"Tehnic","s":"Electric","b":null,"m":5.0,"pos":15070,"pm":7.4,"l":0,"l5":24,"sec":"S1","r":66,"star":false},{"n":"Petru Poni","t":"Liceul Tehnologic","p":"Servicii","s":"Economic","b":null,"m":4.92,"pos":15135,"pm":6.87,"l":84,"l5":72,"sec":"S6","r":89,"star":false},{"n":"Mihai Bravu","t":"Colegiul Tehnic","p":"Tehnic","s":"Mecanică","b":null,"m":4.85,"pos":15179,"pm":5.7,"l":0,"l5":24,"sec":"S3","r":59,"star":false},{"n":"Iuliu Maniu","t":"Colegiul Tehnic","p":"Tehnic","s":"Mecanică","b":null,"m":4.75,"pos":15239,"pm":6.6,"l":56,"l5":24,"sec":"S6","r":77,"star":false},{"n":"Valter Mărăcineanu","t":"Colegiul Tehnic","p":"Tehnic","s":"Mecanică","b":null,"m":4.62,"pos":15312,"pm":7.47,"l":56,"l5":24,"sec":"S1","r":72,"star":false},{"n":"Dimitrie Gusti","t":"Liceul Tehnologic","p":"Tehnic","s":"Mecanică","b":null,"m":4.6,"pos":15330,"pm":7.95,"l":84,"l5":72,"sec":"S5","r":75,"star":false},{"n":"Media","t":"Colegiul Tehnic","p":"Tehnic","s":"Producție media","b":null,"m":4.52,"pos":15357,"pm":8.0,"l":196,"l5":192,"sec":"S1","r":64,"star":false},{"n":"Media","t":"Colegiul Tehnic","p":"Tehnic","s":"Tehnici poligrafice","b":null,"m":4.32,"pos":15468,"pm":6.42,"l":28,"l5":24,"sec":"S1","r":64,"star":false},{"n":"Dragomir Hurmuzescu","t":"Liceul Tehnologic","p":"Tehnic","s":"Electromecanică","b":null,"m":4.27,"pos":15485,"pm":7.25,"l":0,"l5":24,"sec":"S3","r":84,"star":false},{"n":"Dimitrie Leonida","t":"Colegiul Tehnic","p":"Tehnic","s":"Mecanică","b":null,"m":4.27,"pos":15492,"pm":7.42,"l":84,"l5":72,"sec":"S2","r":60,"star":false},{"n":"Dinicu Golescu","t":"Colegiul Tehnic","p":"Tehnic","s":"Mecanică","b":null,"m":4.2,"pos":15517,"pm":8.02,"l":84,"l5":72,"sec":"S1","r":63,"star":false},{"n":"Elie Radu","t":"Liceul Tehnologic","p":"Tehnic","s":"Mecanică","b":null,"m":4.1,"pos":15568,"pm":5.77,"l":84,"l5":48,"sec":"S3","r":87,"star":false},{"n":"Energetic","t":"Colegiul Tehnic","p":"Tehnic","s":"Mecanică","b":null,"m":3.85,"pos":15639,"pm":6.27,"l":28,"l5":48,"sec":"S5","r":74,"star":false},{"n":"Theodor Pallady","t":"Liceul Tehnologic","p":"Tehnic","s":"Electronică automatizări","b":null,"m":3.67,"pos":15679,"pm":7.85,"l":56,"l5":24,"sec":"S3","r":73,"star":false},{"n":"Theodor Pallady","t":"Liceul Tehnologic","p":"Tehnic","s":"Electric","b":null,"m":2.85,"pos":15787,"pm":8.8,"l":28,"l5":24,"sec":"S3","r":73,"star":false},{"n":"Dacia","t":"Liceul Tehnologic","p":"Tehnic","s":"Mecanică","b":null,"m":2.75,"pos":15791,"pm":5.75,"l":56,"l5":96,"sec":"S4","r":88,"star":false},{"n":"Edmond Nicolau","t":"Colegiul Tehnic","p":"Tehnic","s":"Mecanică","b":null,"m":2.75,"pos":15792,"pm":5.85,"l":28,"l5":48,"sec":"S2","r":90,"star":false},{"n":"Edmond Nicolau","t":"Colegiul Tehnic","p":"Tehnic","s":"Electronică automatizări","b":null,"m":2.42,"pos":15805,"pm":7.42,"l":28,"l5":48,"sec":"S2","r":90,"star":false},{"n":"Dumitru Moțoc","t":"Colegiul Tehnic de Industrie Alimentară","p":"Resurse naturale si Protecția mediului","s":"Industrie alimentară","b":null,"m":2.4,"pos":15806,"pm":7.5,"l":196,"l5":192,"sec":"S5","r":91,"star":false},{"n":"Ion I.C. Brătianu","t":"Liceul Tehnologic","p":"Tehnic","s":"Mecanică","b":null,"m":2.4,"pos":15807,"pm":7.3,"l":140,"l5":72,"sec":"S2","r":85,"star":false},{"n":"Mircea cel Bătrân","t":"Colegiul Tehnic","p":"Tehnic","s":"Mecanică","b":null,"m":2.37,"pos":15808,"pm":6.35,"l":84,"l5":72,"sec":"S1","r":86,"star":false},{"n":"Viaceslav Harnaj","t":"Colegiul Tehnologic","p":"Resurse naturale si Protecția mediului","s":"Agricultură","b":null,"m":2.25,"pos":15809,"pm":8.47,"l":112,"l5":96,"sec":"S1","r":81,"star":false},{"n":"Petru Poni","t":"Liceul Tehnologic","p":"Tehnic","s":"Electric","b":null,"m":2.25,"pos":15810,"pm":6.95,"l":56,"l5":72,"sec":"S6","r":89,"star":false},{"n":"Theodor Pallady","t":"Liceul Tehnologic","p":"Tehnic","s":"Mecanică","b":null,"m":2.05,"pos":15811,"pm":6.5,"l":84,"l5":96,"sec":"S3","r":73,"star":false},{"n":"Carol I","t":"Colegiul Tehnic","p":"Tehnic","s":"Mecanică","b":null,"m":1.85,"pos":15812,"pm":6.15,"l":56,"l5":48,"sec":"S6","r":70,"star":false}];

// Validare metoda pe poziție (pos_N ≈ pos_(N-1)) — PANEL COMPLET, nu top50.
// Sursă: LiceeB-2026_06.xlsx (poziții „Ultima poziție la ADMITERE" 2020-2025), toate specializările cu poziție validă în ambii ani ai tranziției.
// n variază pe tranziție (specializări noi/eliminate/fără poziție înregistrată în unul din ani).
// bias = poziție(an_N) − poziție(an_N−1); pozitiv = poziția a crescut (loc de ultimă admitere mai „adânc").
// over = % specializări cu |eroare| > 250 locuri. Recalculat independent, verificat MAE/mediană identic cu raportul de audit inițial (top50 vechi era nereproductibil sub 5 interpretări testate — vezi raport).
const VALID = [
  { t: "2024→2025", n: 325, mae: 329, med: 200, bias: -132, over: 40, nota: "an tipic (fără eveniment extern cunoscut)" },
  { t: "2023→2024", n: 306, mae: 920, med: 778, bias: 892, over: 82, nota: "salt structural (cohortă/formulă)" },
  { t: "2022→2023", n: 295, mae: 499, med: 288, bias: -409, over: 52, nota: "an tipic (fără eveniment extern cunoscut)" },
  { t: "2021→2022", n: 243, mae: 827, med: 383, bias: 181, over: 65, nota: "perioadă COVID" },
  { t: "2020→2021", n: 212, mae: 703, med: 347, bias: -153, over: 59, nota: "perioadă COVID" },
];
const CODMAP = {"0":"272","1":"103","3":"273","5":"179","6":"181","7":"101","9":"116","10":"275","11":"115","12":"117","13":"274","14":"104","15":"297","16":"107","18":"183","19":"225","20":"224","21":"109","23":"182","24":"296","25":"255","26":"169","27":"227","28":"105","29":"254","30":"175","33":"114","34":"226","35":"168","36":"172","37":"257","38":"259","39":"299","40":"173","41":"170","42":"256","44":"293","45":"138","46":"110","48":"261","49":"251","50":"139","51":"112","53":"298","54":"229","55":"250","56":"126","57":"228","58":"176","59":"125","60":"260","61":"188","62":"253","63":"127","64":"142","66":"190","67":"146","68":"131","69":"252","70":"130","71":"230","72":"141","73":"132","74":"276","75":"128","78":"295","79":"129","80":"277","81":"191","82":"304","83":"208","84":"133","85":"148","86":"160","87":"193","88":"233","89":"209","90":"231","92":"210","93":"305","94":"194","96":"278","98":"306","99":"161","100":"235","101":"196","102":"284","103":"143","104":"307","108":"145","114":"118","115":"195","116":"286","117":"308","118":"283","119":"262","120":"119","121":"285","122":"300","127":"264","129":"120","130":"237","131":"309","132":"211","133":"301","134":"263","135":"198","136":"238","137":"310","138":"199","141":"197","143":"122","147":"212","148":"302","149":"313","150":"207","151":"282","152":"205","153":"303","154":"239","155":"279","158":"206","159":"166","160":"280","161":"281","162":"315","163":"314","164":"242","166":"318","167":"319","168":"243","171":"244","176":"234","178":"123","179":"185","180":"184","181":"187","182":"186","183":"213","184":"240","185":"201","186":"156","187":"214","188":"202","189":"203","190":"204","191":"241","192":"215","194":"32","195":"216","196":"162","198":"163","201":"151","202":"248","203":"218","204":"246","205":"292","206":"291","207":"157","208":"158","209":"245","210":"247","211":"222","212":"164","213":"269","214":"219","216":"221","217":"153","218":"167","219":"271","221":"311","222":"270","224":"159","225":"249","227":"312","228":"287","229":"290","230":"289","233":"154","234":"288","235":"316","236":"165","239":"152","243":"317","254":"150","259":"155","264":"200","2":"102","4":"180","22":"171","31":"174","32":"258","47":"140","52":"178","76":"294","95":"189","106":"147","111":"192","123":"144","126":"177","142":"149","169":"236","173":"232","8":"106","17":"108","43":"113","65":"111"}; // cod oficial admitere (134/158 verificate din Coduri_licee; restul '—')
// Bandă PROPORȚIONALĂ cu poziția — RECALIBRAT (verificare independentă pe 2020-2025, panel Excel istoric):
// eroarea mediană reală e ~5,7% pe ani tipici (2022-25), nu 2,7-3% cum presupunea versiunea anterioară.
// Cap-urile vechi (80-400 / 200-900) limitau acoperirea reală la ~70% în loc de 92% promis — verificat, corectat.
// ===== BENZI DE POZIȚIE CALIBRATE PE ADÂNCIME ȘI PE TRACK (red team v3, runda 2) =====
// Sursă: distribuția shift-urilor relative de poziție (posY − posY-1)/posY-1, 5 tranziții 2020-2025,
// din LiceeB-2026_06.xlsx sheet 1 (360 rânduri, TOATE liceele — nu doar cele 49 inițiale).
// SPLIT PE TRACK: backtest separat a arătat Tehnic/Servicii/Resurse cu eroare de 3-5x mai mare decât
// Real/Umanist chiar la adâncime egală (MAE 0,91 vs 0,30 la poz>6000) — o bandă unică ascundea asta.
// Segmente cu <30 observații pentru un track (ex. Tehnic sub 6.000, Teoretic peste 14.000 — cazuri rare
// în practică) folosesc fallback pe banda COMBINATĂ a acelui segment, nu valori calculate pe eșantion mic.
// SEGMENT NOU 14.000-17.000: la calibrarea inițială, bucket-ul se oprea la 14.000 — au fost excluse din
// greșeală 130 de observații istorice reale (poziții până la 16.562). Acum incluse (n=111, dominant Tehnic).
// La coada extremă (14-17k), shift-ul relativ brut ieșea NEGATIV pe eșantion (artefact de plafon — spre
// coada ierarhiei, numărul total de candidați diferă de la an la an și comprimă mișcările) — am aplicat
// un prag local: banda de coadă nu poate fi mai îngustă decât segmentul imediat anterior (10-14k).
const TRACK_TEORETIC = new Set(["Real", "Umanist"]);
function trackOf(profil){ return TRACK_TEORETIC.has(profil) ? "TEORETIC" : "TEHNIC"; }
const POSBAND_TEORETIC = [[1000,0.116,0.306],[3000,0.043,0.154],[5000,0.056,0.165],[7000,0.075,0.179],[9000,0.091,0.267],[12000,0.015,0.145],[15500,0.015,0.154]];
const POSBAND_TEHNIC   = [[1000,0.116,0.306],[3000,0.043,0.154],[5000,0.057,0.165],[7000,0.073,0.174],[9000,0.099,0.243],[12000,0.147,0.252],[15500,0.147,0.252]];
function posBandPct(pos, idx, profil){
  const T = trackOf(profil) === "TEORETIC" ? POSBAND_TEORETIC : POSBAND_TEHNIC;
  if (pos <= T[0][0]) return T[0][idx];
  if (pos >= T[T.length-1][0]) return T[T.length-1][idx];
  for (let i=0;i<T.length-1;i++){
    const x0=T[i][0], x1=T[i+1][0];
    if (pos>=x0 && pos<=x1){ const f=(pos-x0)/(x1-x0); return T[i][idx]+(T[i+1][idx]-T[i][idx])*f; }
  }
  return T[T.length-1][idx];
}
const coreBand = (pos, profil) => Math.round(Math.max(100, posBandPct(pos,1,profil) * pos));
const safeBand = (pos, profil) => Math.round(Math.max(250, posBandPct(pos,2,profil) * pos));

// ===== CONVERSIE POZIȚIE → MEDIE, empirică (elimină tierDelta/areaOffset/regim) =====
// Sursă: Ierarhie_Bucuresti_EN2026_FINAL.csv — rezultate EN2026 FINALE, după soluționarea contestațiilor
// (publicate 8 iulie 2026, ierarhia București publicată 9 iulie 2026 pe admitere.edu.ro), 15.422 candidați
// cu medie validă (fișierul preliminar avea 15.643 rânduri, din care 221 candidați „Absent" — eliminați
// complet din ierarhia finală, nu doar marcați).
//
// ACTUALIZAT 9 iulie 2026 — refresh integral din datele finale. Verificat empiric înainte de reconstruire:
// Media_admitere == Media_EN pentru toți cei 15.422 candidați (diferență 0 în toate cazurile) — confirmă
// formula pure-EN-average. Comparativ cu fișierul preliminar: 2.009 din 15.422 candidați (13%) au medie EN
// schimbată de contestații (1.333 crescut, 676 scăzut, delta maxim +2,45); poziția 1 s-a schimbat (alt
// candidat a ajuns la media 10,00 după contestație).
// Tabelul e reconstruit direct din poziția candidatului în CSV final (nu re-eșantionat), verificat prin
// DOUĂ metode independente de indexare (round vs. ceil) — diferă în doar 1 din 201 puncte, cu 0,02
// (zgomot de rotunjire). Verificat: 0 inversări, 0 valori lipsă, pas maxim 0,15 / mediu 0,026 pe
// percentila 0-90% (calitate identică cu tabelul precedent, pe date acum finale).
// Spre deosebire de tabelul precedent: nu mai există candidați absenți în fișier, deci nu mai e nevoie de
// extrapolare plată la coadă — toate cele 201 puncte au date reale, poziția 15.422 (percentila 100%) = 1,00.
const TOTAL_EN2026_B = 15422; // total candidați cu medie validă, ierarhia EN2026 București FINALĂ (post-contestații, 9 iulie) — anterior 15.643 (includea 221 „Absent")
const PCT_TABLE = [[0.0, 10.0], [0.5, 9.85], [1.0, 9.8], [1.5, 9.75], [2.0, 9.72], [2.5, 9.7], [3.0, 9.67], [3.5, 9.65], [4.0, 9.65], [4.5, 9.62], [5.0, 9.6], [5.5, 9.57], [6.0, 9.57], [6.5, 9.55], [7.0, 9.52], [7.5, 9.52], [8.0, 9.5], [8.5, 9.47], [9.0, 9.47], [9.5, 9.45], [10.0, 9.42], [10.5, 9.42], [11.0, 9.4], [11.5, 9.4], [12.0, 9.37], [12.5, 9.37], [13.0, 9.35], [13.5, 9.35], [14.0, 9.32], [14.5, 9.3], [15.0, 9.3], [15.5, 9.27], [16.0, 9.27], [16.5, 9.25], [17.0, 9.25], [17.5, 9.22], [18.0, 9.22], [18.5, 9.2], [19.0, 9.2], [19.5, 9.17], [20.0, 9.15], [20.5, 9.15], [21.0, 9.12], [21.5, 9.12], [22.0, 9.1], [22.5, 9.07], [23.0, 9.07], [23.5, 9.05], [24.0, 9.05], [24.5, 9.02], [25.0, 9.02], [25.5, 9.0], [26.0, 9.0], [26.5, 8.97], [27.0, 8.95], [27.5, 8.95], [28.0, 8.92], [28.5, 8.9], [29.0, 8.88], [29.5, 8.87], [30.0, 8.85], [30.5, 8.85], [31.0, 8.82], [31.5, 8.8], [32.0, 8.8], [32.5, 8.77], [33.0, 8.77], [33.5, 8.75], [34.0, 8.75], [34.5, 8.72], [35.0, 8.7], [35.5, 8.7], [36.0, 8.67], [36.5, 8.65], [37.0, 8.62], [37.5, 8.62], [38.0, 8.6], [38.5, 8.57], [39.0, 8.57], [39.5, 8.55], [40.0, 8.52], [40.5, 8.5], [41.0, 8.5], [41.5, 8.47], [42.0, 8.45], [42.5, 8.42], [43.0, 8.4], [43.5, 8.37], [44.0, 8.37], [44.5, 8.35], [45.0, 8.32], [45.5, 8.3], [46.0, 8.3], [46.5, 8.27], [47.0, 8.25], [47.5, 8.22], [48.0, 8.2], [48.5, 8.17], [49.0, 8.17], [49.5, 8.15], [50.0, 8.12], [50.5, 8.1], [51.0, 8.07], [51.5, 8.05], [52.0, 8.02], [52.5, 8.0], [53.0, 7.97], [53.5, 7.95], [54.0, 7.92], [54.5, 7.9], [55.0, 7.87], [55.5, 7.85], [56.0, 7.82], [56.5, 7.8], [57.0, 7.77], [57.5, 7.75], [58.0, 7.72], [58.5, 7.7], [59.0, 7.67], [59.5, 7.65], [60.0, 7.62], [60.5, 7.6], [61.0, 7.55], [61.5, 7.52], [62.0, 7.5], [62.5, 7.47], [63.0, 7.45], [63.5, 7.42], [64.0, 7.37], [64.5, 7.35], [65.0, 7.32], [65.5, 7.3], [66.0, 7.27], [66.5, 7.25], [67.0, 7.2], [67.5, 7.17], [68.0, 7.12], [68.5, 7.1], [69.0, 7.07], [69.5, 7.05], [70.0, 7.0], [70.5, 6.97], [71.0, 6.92], [71.5, 6.87], [72.0, 6.85], [72.5, 6.82], [73.0, 6.77], [73.5, 6.75], [74.0, 6.7], [74.5, 6.67], [75.0, 6.65], [75.5, 6.6], [76.0, 6.57], [76.5, 6.52], [77.0, 6.5], [77.5, 6.45], [78.0, 6.42], [78.5, 6.4], [79.0, 6.35], [79.5, 6.32], [80.0, 6.27], [80.5, 6.22], [81.0, 6.17], [81.5, 6.15], [82.0, 6.1], [82.5, 6.07], [83.0, 6.02], [83.5, 5.97], [84.0, 5.92], [84.5, 5.9], [85.0, 5.82], [85.5, 5.77], [86.0, 5.72], [86.5, 5.67], [87.0, 5.62], [87.5, 5.57], [88.0, 5.52], [88.5, 5.47], [89.0, 5.42], [89.5, 5.35], [90.0, 5.3], [90.5, 5.25], [91.0, 5.17], [91.5, 5.1], [92.0, 5.02], [92.5, 4.92], [93.0, 4.87], [93.5, 4.8], [94.0, 4.72], [94.5, 4.65], [95.0, 4.57], [95.5, 4.45], [96.0, 4.37], [96.5, 4.22], [97.0, 4.1], [97.5, 3.95], [98.0, 3.72], [98.5, 3.47], [99.0, 3.2], [99.5, 2.85], [100.0, 1.0]];
// Interval de poziții per medie (din același CSV final): [media, prima_poziție, ultima_poziție] — 402 medii distincte, intervale contigue verificate.
const MEDIE_RANGES = [[10.0,1,4],[9.97,5,9],[9.95,10,19],[9.92,20,29],[9.9,30,50],[9.88,51,51],[9.87,52,73],[9.86,74,74],[9.85,75,102],[9.82,103,130],[9.81,131,131],[9.8,132,175],[9.78,176,176],[9.77,177,222],[9.75,223,284],[9.73,285,288],[9.72,289,358],[9.7,359,446],[9.68,447,449],[9.67,450,534],[9.66,535,535],[9.65,536,628],[9.63,629,631],[9.62,632,727],[9.61,728,732],[9.6,733,821],[9.58,822,822],[9.57,823,930],[9.56,931,933],[9.55,934,1062],[9.53,1063,1064],[9.52,1065,1190],[9.51,1191,1192],[9.5,1193,1301],[9.47,1302,1414],[9.46,1415,1417],[9.45,1418,1536],[9.43,1537,1539],[9.42,1540,1665],[9.41,1666,1668],[9.4,1669,1805],[9.38,1806,1809],[9.37,1810,1939],[9.36,1940,1942],[9.35,1943,2082],[9.33,2083,2085],[9.32,2086,2216],[9.31,2217,2218],[9.3,2219,2351],[9.28,2352,2354],[9.27,2355,2497],[9.26,2498,2498],[9.25,2499,2636],[9.23,2637,2637],[9.22,2638,2792],[9.21,2793,2794],[9.2,2795,2942],[9.18,2943,2943],[9.17,2944,3070],[9.16,3071,3071],[9.15,3072,3210],[9.13,3211,3211],[9.12,3212,3338],[9.11,3339,3340],[9.1,3341,3457],[9.08,3458,3458],[9.07,3459,3598],[9.06,3599,3599],[9.05,3600,3738],[9.02,3739,3865],[9.01,3866,3867],[9.0,3868,4013],[8.98,4014,4016],[8.97,4017,4130],[8.96,4131,4133],[8.95,4134,4256],[8.93,4257,4258],[8.92,4259,4346],[8.9,4347,4471],[8.88,4472,4474],[8.87,4475,4596],[8.85,4597,4723],[8.82,4724,4851],[8.81,4852,4853],[8.8,4854,4998],[8.78,4999,4999],[8.77,5000,5117],[8.76,5118,5120],[8.75,5121,5246],[8.73,5247,5247],[8.72,5248,5371],[8.7,5372,5476],[8.68,5477,5480],[8.67,5481,5579],[8.66,5580,5580],[8.65,5581,5701],[8.62,5702,5815],[8.61,5816,5817],[8.6,5818,5923],[8.58,5924,5924],[8.57,5925,6038],[8.55,6039,6142],[8.52,6143,6236],[8.51,6237,6238],[8.5,6239,6339],[8.48,6340,6342],[8.47,6343,6417],[8.46,6418,6419],[8.45,6420,6518],[8.43,6519,6519],[8.42,6520,6606],[8.41,6607,6607],[8.4,6608,6705],[8.38,6706,6708],[8.37,6709,6807],[8.35,6808,6909],[8.32,6910,7003],[8.3,7004,7097],[8.27,7098,7180],[8.25,7181,7289],[8.23,7290,7290],[8.22,7291,7374],[8.2,7375,7467],[8.18,7468,7469],[8.17,7470,7562],[8.16,7563,7563],[8.15,7564,7658],[8.13,7659,7659],[8.12,7660,7735],[8.1,7736,7818],[8.08,7819,7819],[8.07,7820,7913],[8.06,7914,7914],[8.05,7915,7997],[8.02,7998,8074],[8.0,8075,8170],[7.98,8171,8171],[7.97,8172,8244],[7.96,8245,8246],[7.95,8247,8324],[7.92,8325,8392],[7.91,8393,8393],[7.9,8394,8470],[7.87,8471,8541],[7.86,8542,8542],[7.85,8543,8615],[7.83,8616,8616],[7.82,8617,8694],[7.8,8695,8756],[7.77,8757,8827],[7.76,8828,8829],[7.75,8830,8905],[7.72,8906,8966],[7.7,8967,9036],[7.68,9037,9037],[7.67,9038,9119],[7.66,9120,9120],[7.65,9121,9200],[7.62,9201,9266],[7.61,9267,9267],[7.6,9268,9333],[7.58,9334,9334],[7.57,9335,9404],[7.55,9405,9478],[7.53,9479,9479],[7.52,9480,9542],[7.51,9543,9543],[7.5,9544,9608],[7.47,9609,9673],[7.45,9674,9735],[7.42,9736,9807],[7.4,9808,9866],[7.37,9867,9936],[7.36,9937,9938],[7.35,9939,10010],[7.32,10011,10075],[7.3,10076,10135],[7.28,10136,10137],[7.27,10138,10200],[7.25,10201,10262],[7.23,10263,10263],[7.22,10264,10320],[7.2,10321,10371],[7.17,10372,10429],[7.15,10430,10482],[7.12,10483,10549],[7.1,10550,10618],[7.08,10619,10619],[7.07,10620,10678],[7.05,10679,10726],[7.02,10727,10772],[7.0,10773,10819],[6.97,10820,10873],[6.95,10874,10924],[6.93,10925,10925],[6.92,10926,10967],[6.9,10968,11019],[6.87,11020,11085],[6.85,11086,11144],[6.82,11145,11196],[6.8,11197,11244],[6.77,11245,11308],[6.75,11309,11346],[6.73,11347,11347],[6.72,11348,11407],[6.7,11408,11469],[6.67,11470,11533],[6.65,11534,11572],[6.62,11573,11615],[6.6,11616,11665],[6.57,11666,11729],[6.55,11730,11784],[6.52,11785,11844],[6.5,11845,11897],[6.47,11898,11947],[6.45,11948,11994],[6.42,11995,12059],[6.4,12060,12116],[6.37,12117,12171],[6.35,12172,12230],[6.32,12231,12279],[6.3,12280,12322],[6.27,12323,12361],[6.25,12362,12405],[6.22,12406,12449],[6.2,12450,12481],[6.17,12482,12525],[6.15,12526,12571],[6.12,12572,12618],[6.1,12619,12668],[6.07,12669,12726],[6.05,12727,12777],[6.02,12778,12822],[6.0,12823,12864],[5.97,12865,12908],[5.95,12909,12953],[5.92,12954,13000],[5.9,13001,13039],[5.87,13040,13077],[5.86,13078,13078],[5.85,13079,13106],[5.82,13107,13141],[5.8,13142,13169],[5.77,13170,13210],[5.75,13211,13241],[5.72,13242,13280],[5.7,13281,13314],[5.67,13315,13352],[5.65,13353,13398],[5.62,13399,13418],[5.6,13419,13468],[5.57,13469,13509],[5.55,13510,13544],[5.52,13545,13591],[5.5,13592,13629],[5.47,13630,13664],[5.45,13665,13699],[5.43,13700,13700],[5.42,13701,13739],[5.4,13740,13762],[5.37,13763,13799],[5.35,13800,13841],[5.32,13842,13874],[5.3,13875,13911],[5.27,13912,13936],[5.25,13937,13968],[5.22,13969,13995],[5.2,13996,14024],[5.17,14025,14044],[5.15,14045,14069],[5.12,14070,14095],[5.11,14096,14096],[5.1,14097,14126],[5.07,14127,14147],[5.05,14148,14169],[5.02,14170,14192],[5.0,14193,14224],[4.97,14225,14242],[4.95,14243,14264],[4.92,14265,14294],[4.9,14295,14325],[4.87,14326,14355],[4.85,14356,14390],[4.82,14391,14417],[4.8,14418,14442],[4.78,14443,14443],[4.77,14444,14471],[4.75,14472,14493],[4.72,14494,14519],[4.7,14520,14545],[4.67,14546,14572],[4.65,14573,14587],[4.62,14588,14610],[4.6,14611,14628],[4.57,14629,14651],[4.55,14652,14669],[4.52,14670,14689],[4.5,14690,14709],[4.47,14710,14724],[4.45,14725,14740],[4.42,14741,14759],[4.4,14760,14787],[4.37,14788,14805],[4.35,14806,14823],[4.32,14824,14837],[4.3,14838,14852],[4.27,14853,14860],[4.25,14861,14875],[4.22,14876,14892],[4.2,14893,14909],[4.17,14910,14924],[4.15,14925,14943],[4.12,14944,14953],[4.1,14954,14971],[4.07,14972,14975],[4.05,14976,14993],[4.02,14994,15007],[4.0,15008,15015],[3.97,15016,15031],[3.95,15032,15043],[3.92,15044,15056],[3.9,15057,15062],[3.87,15063,15073],[3.85,15074,15083],[3.82,15084,15092],[3.8,15093,15095],[3.77,15096,15102],[3.75,15103,15111],[3.72,15112,15119],[3.7,15120,15125],[3.67,15126,15132],[3.65,15133,15148],[3.62,15149,15155],[3.6,15156,15163],[3.57,15164,15167],[3.55,15168,15174],[3.52,15175,15181],[3.5,15182,15187],[3.47,15188,15197],[3.45,15198,15206],[3.42,15207,15214],[3.4,15215,15224],[3.37,15225,15230],[3.35,15231,15232],[3.32,15233,15243],[3.3,15244,15249],[3.27,15250,15254],[3.25,15255,15259],[3.22,15260,15267],[3.2,15268,15271],[3.17,15272,15277],[3.15,15278,15282],[3.12,15283,15287],[3.1,15288,15298],[3.07,15299,15308],[3.05,15309,15312],[3.02,15313,15319],[3.0,15320,15326],[2.97,15327,15328],[2.95,15329,15334],[2.92,15335,15339],[2.9,15340,15342],[2.87,15343,15344],[2.85,15345,15349],[2.82,15350,15353],[2.8,15354,15359],[2.77,15360,15364],[2.75,15365,15365],[2.72,15366,15368],[2.7,15369,15370],[2.65,15371,15372],[2.62,15373,15373],[2.6,15374,15375],[2.57,15376,15378],[2.55,15379,15380],[2.52,15381,15382],[2.5,15383,15383],[2.47,15384,15386],[2.45,15387,15387],[2.42,15388,15388],[2.4,15389,15391],[2.37,15392,15393],[2.35,15394,15394],[2.32,15395,15395],[2.3,15396,15398],[2.25,15399,15400],[2.2,15401,15405],[2.17,15406,15406],[2.15,15407,15407],[2.12,15408,15408],[2.1,15409,15409],[2.02,15410,15411],[1.97,15412,15412],[1.9,15413,15413],[1.85,15414,15414],[1.82,15415,15415],[1.8,15416,15416],[1.75,15417,15418],[1.7,15419,15419],[1.65,15420,15420],[1.25,15421,15421],[1.0,15422,15422]];
function medieRange(m){ return MEDIE_RANGES.find(x => Math.abs(x[0]-m) < 0.005) || null; }
// Scenariu cohortă 2026: EN B −10,7% candidați (măsurat în sesiunea de calibrare); locuri per rând l (2026) vs l5 (2025), total broșură +8,76% (verificat). În afara domeniului backtestului.
const RAPORT_COHORTA_2026 = 0.893;
function pragScenariuCohorta(r){ const k = (r.l && r.l5) ? r.l / r.l5 : 1.088; return Math.round(r.pos * RAPORT_COHORTA_2026 * k); }
function medieFromPercentila(p){ const pp = Math.max(0, Math.min(100, p)); for (let i=0;i<PCT_TABLE.length-1;i++){ const [p0,m0]=PCT_TABLE[i], [p1,m1]=PCT_TABLE[i+1]; if (pp>=p0 && pp<=p1){ if (p1===p0) return m0; const f=(pp-p0)/(p1-p0); return Math.round((m0+(m1-m0)*f)*100)/100; } } return PCT_TABLE[PCT_TABLE.length-1][1]; }
function medieFromPos(pos){ return medieFromPercentila(pos/TOTAL_EN2026_B*100); }
// ===== COADA IERARHIEI — praguri determinate de CERERE, nu de competiție (red team v3) =====
// Extinderea la toate cele 91 de licee a adus specializări cu pragul 2025 sub 5,00 (licee istoric NEUMPLUTE:
// ultimul admis e ultimul care a vrut, nu o barieră). Două probleme, tratate onest, nu ascunse:
// (1) 18 specializări au poziția-prag 2025 (max 15.812, ierarhia de admitere) DINCOLO de ierarhia EN 2026
//     FINALĂ (15.422 total) — percentila >100%, clamped; verificat direct pe DATA după actualizarea din
//     9 iulie (toate cele 18 au deja prag 2025 < 5,00, deci intră oricum pe ramura „intrare liberă" de mai
//     jos — clamparea nu schimbă nimic vizibil în UI, doar acuratețea internă a percentilei);
// (2) persistența poziției presupune competiție la prag — invalid unde locurile depășesc cererea.
// Regulă: pentru specializările cu prag 2025 < 5,00 nu afișăm un prag 2026 fals-precis, ci „intrare liberă".
// Clasificarea pe POZIȚIE rămâne validă (poziția candidatului și pragul istoric sunt reale); benzile
// POSBAND/MBAND sunt calibrate pe segmente până la poz. 14.000 — peste, folosesc ultimul punct (clamp).
const PRAG_COADA = 5.00;
function esteCoada(r){ return r.m < PRAG_COADA; }
// Invers: din media candidatului, deduce percentila/poziția echivalentă (pentru banda istorică mai jos).
function percentilaFromMedie(m){ if (m >= PCT_TABLE[0][1]) return 0; for (let i=0;i<PCT_TABLE.length-1;i++){ const [p0,m0]=PCT_TABLE[i], [p1,m1]=PCT_TABLE[i+1]; if (m<=m0 && m>=m1){ if (m0===m1) return p0; const f=(m0-m)/(m0-m1); return p0+(p1-p0)*f; } } return 100; }
function pozFromMedie(m){ return Math.round(percentilaFromMedie(m)/100*TOTAL_EN2026_B); }
function classifyPos(pos, poz, profil){ const margin = pos - poz; const cb = coreBand(pos, profil), sb = safeBand(pos, profil); if (margin >= sb) return "sigur"; if (margin >= cb) return "probabil"; if (margin >= -cb) return "incert"; return "improb"; }

// ===== BENZI DE INCERTITUDINE PE MEDIE — CALIBRATE PE ADÂNCIME ȘI PE TRACK (red team v3, runda 2) =====
// Aceeași sursă și aceeași descoperire ca la POSBAND: Tehnic/Servicii/Resurse are eroare de câteva ori mai
// mare decât Real/Umanist la adâncime egală (MAE 0,88 vs 0,17 per total). Segment nou 14.000-17.000 adăugat
// (n=111, exclus anterior dintr-o eroare de bucket la 14.000). Fallback pe banda combinată unde un track
// are <30 observații într-un segment (Tehnic sub 6.000; Teoretic peste 14.000 — azi 0 cazuri reale acolo).
const MBAND_TEORETIC = [[1000,0.038,0.099],[3000,0.03,0.098],[5000,0.05,0.177],[7000,0.109,0.32],[9000,0.191,0.795],[12000,0.283,0.92],[15500,1.119,2.67]];
const MBAND_TEHNIC   = [[1000,0.038,0.099],[3000,0.03,0.098],[5000,0.05,0.181],[7000,0.10,0.30],[9000,0.201,0.939],[12000,0.735,1.895],[15500,1.119,2.508]];
function medieBands(pos, profil){
  const T = trackOf(profil) === "TEORETIC" ? MBAND_TEORETIC : MBAND_TEHNIC;
  if (pos <= T[0][0]) return { b50: T[0][1], b90: T[0][2] };
  if (pos >= T[T.length-1][0]) { const l = T[T.length-1]; return { b50: l[1], b90: l[2] }; }
  for (let i=0;i<T.length-1;i++){
    const [x0,a0,c0]=T[i],[x1,a1,c1]=T[i+1];
    if (pos>=x0 && pos<=x1){ const f=(pos-x0)/(x1-x0); return { b50: a0+(a1-a0)*f, b90: c0+(c1-c0)*f }; }
  }
  const l=T[T.length-1]; return { b50: l[1], b90: l[2] };
}
// Aceeași structură ca classifyPos (sigur ≥ banda mare; probabil ≥ banda mică; incert ≥ −banda mică):
function classifyMedie(pos, media, profil){ const prag = medieFromPos(pos); const m = media - prag; const { b50, b90 } = medieBands(pos, profil); if (m >= b90) return "sigur"; if (m >= b50) return "probabil"; if (m >= -b50) return "incert"; return "improb"; }

// ===== CORECȚIE IERARHIE v1→v3 — informativă, NEAPLICATĂ în prag =====
// PCT_TABLE e construit pe ierarhia EN finală, după contestații (v1). Pragul real de admitere trăiește în
// ierarhia de la înscriere (v3): −candidați B care nu se înscriu la admitere, +~2.500 din alte județe.
// Diferența medie(v3)−medie(v1) la poziție fixă, măsurată pe 2024 (singurul an cu ambele ierarhii în sursă):
// crescătoare cu adâncimea, de la −0,04 (poz. 501) la −0,52 (poz. 12.501). Direcție: pragul REAL tinde să fie
// MAI MIC decât estimarea v1 → estimarea actuală e conservatoare (în favoarea siguranței candidatului).
// NU aplicăm corecția în prag (un singur an de date, iar 2026 e atipic: cohortă −10,7%, locuri +8,8%);
// o afișăm ca scenariu secundar în panoul detaliat.
const CORR_V1V3 = [[501,-0.04],[1001,-0.06],[2001,-0.09],[3001,-0.15],[4001,-0.22],[6001,-0.32],[8001,-0.40],[10001,-0.47],[12501,-0.52]];
function corectieV1V3(pos){
  const T = CORR_V1V3;
  if (pos <= T[0][0]) return T[0][1];
  if (pos >= T[T.length-1][0]) return T[T.length-1][1];
  for (let i=0;i<T.length-1;i++){
    const [x0,y0]=T[i],[x1,y1]=T[i+1];
    if (pos>=x0 && pos<=x1) return y0+(y1-y0)*(pos-x0)/(x1-x0);
  }
  return T[T.length-1][1];
}

// ===== INDICATOR ISTORIC (NU o probabilitate calibrată) =====
// Sursă: LiceeB-2026_06.xlsx, 357 specializări, pozițiile "Ultima poziție la ADMITERE" 2020-2025.
// Pentru fiecare din cele 5 tranziții reale și pentru o grilă de marje proporționale (marjă/poziție prag),
// calculează ce % din specializări au rămas efectiv sub prag anul următor. Arătat PE FIECARE AN separat,
// nu doar media (pooled), pentru că varianța reală e enormă: la marjă 6%, acoperirea a fost 17,0% în
// 2023→2024 (an cu salt structural) și 93,9-93,8% în 2022→2023 și 2024→2025 (ani tipici) — diferență de
// 77 puncte procentuale pentru "aceeași" marjă. O singură cifră "% șansă" ar ascunde exact această
// instabilitate — de-asta nu există un singur număr, ci un interval pe an + media pe toate.
const HIST_YEARS = ["2020→21", "2021→22", "2022→23", "2023→24*", "2024→25"]; // * = salt structural (cohortă/formulă)
// Grilă extinsă și pe marje NEGATIVE (candidat sub prag) — nu doar pozitive. O marjă negativă tăiată la 0
// ar fi arătat fals de optimist pentru cazurile IMPROBABIL (candidatul chiar sub linia de anul trecut).
const HIST_TABLE = [
  [-30, [2, 1, 0, 0, 1],     1],
  [-20, [8, 5, 1, 0, 3],     3],
  [-13, [18, 8, 3, 1, 6],    7],
  [-8,  [28, 31, 23, 2, 10], 17],
  [-4,  [39, 48, 50, 4, 24], 32],
  [-2,  [47, 60, 62, 6, 37], 41],
  [0,   [56, 69, 75, 8, 60], 53],
  [2,   [66, 72, 85, 10, 78], 61],
  [4,   [73, 74, 91, 13, 88], 67],
  [6,   [78, 76, 94, 17, 94], 71],
  [8,   [82, 79, 96, 27, 96], 75],
  [10,  [85, 79, 96, 43, 96], 80],
  [13,  [90, 82, 96, 64, 97], 86],
  [17,  [91, 87, 97, 87, 98], 92],
  [20,  [93, 88, 97, 95, 99], 95],
  [25,  [95, 92, 99, 98, 99], 97],
  [30,  [97, 97, 99, 99, 99], 98],
  [40,  [99, 100, 99, 100, 99], 99],
  [50,  [100, 100, 99, 100, 99], 99],
];
function istoricLaMarja(marjaProc) {
  const mp = marjaProc * 100; // NU mai truncăm la 0 — marja negativă (sub prag) trebuie să scadă real
  const T = HIST_TABLE;
  if (mp <= T[0][0]) return { ani: T[0][1], pooled: T[0][2] };
  if (mp >= T[T.length - 1][0]) { const last = T[T.length - 1]; return { ani: last[1], pooled: last[2] }; }
  for (let i = 0; i < T.length - 1; i++) {
    const [m0, a0, p0] = T[i], [m1, a1, p1] = T[i + 1];
    if (mp >= m0 && mp <= m1) {
      const f = (mp - m0) / (m1 - m0);
      const ani = a0.map((v, idx) => Math.round(v + (a1[idx] - v) * f));
      const pooled = Math.round(p0 + (p1 - p0) * f);
      return { ani, pooled };
    }
  }
  return { ani: T[T.length - 1][1], pooled: T[T.length - 1][2] };
}

const fmt = (v) => (v == null ? "—" : v.toFixed(2).replace(".", ","));
const fi = (v) => v == null ? "—" : Math.round(v).toLocaleString("ro-RO");

// ===== ISTORIC INFORMATIV: ce medie a fost la o poziție dată, pe ani (BUCUREȘTI) =====
// Surse: 2021-2025 = tabelele oficiale notă→poziție + poziție→notă din LiceeB-2026_06.xlsx, sheet Statistici,
// ierarhia EN DUPĂ contestații (v2). 2020 = reconstruit din perechile (poziție, medie prag) ale specializărilor
// (ierarhia de ADMITERE — altă bază de numărare, marcat distinct). 2026 = CSV oficial EN, ÎNAINTE de contestații (v1).
// Bazele diferă ușor între ani (v1/v2/v-admitere) — comparabil informativ, nu identic metodologic.
const POS_MEDIE_ANI = {"2020":[[192,9.98],[411,9.9],[1115,9.76],[2032,9.59],[3019,9.43],[3987,9.25],[4991,9.06],[6020,8.83],[7981,8.35],[10025,7.73],[11483,7.11]],"2021":[[8,10.0],[439,9.75],[500,9.72],[1000,9.59],[1325,9.5],[2000,9.33],[2343,9.25],[3000,9.07],[3269,9.0],[4000,8.77],[4807,8.5],[5000,8.42],[6000,8.03],[6079,8.0],[8000,7.17],[8212,7.0],[9855,6.0],[10000,5.89],[11085,5.0],[12500,2.92]],"2022":[[21,10.0],[500,9.8],[821,9.75],[1000,9.71],[2000,9.51],[2089,9.5],[3000,9.34],[3524,9.25],[4000,9.16],[4850,9.0],[5000,8.96],[6000,8.75],[7089,8.5],[8000,8.24],[8767,8.0],[10000,7.56],[11490,7.0],[12500,6.56],[13596,6.0],[14801,5.0],[15000,4.73]],"2023":[[104,10.0],[500,9.85],[1000,9.75],[2000,9.52],[2232,9.5],[3000,9.32],[3526,9.25],[4000,9.15],[4778,9.0],[5000,8.93],[6000,8.7],[6912,8.5],[8000,8.17],[8601,8.0],[10000,7.37],[10726,7.0],[12236,6.0],[12500,5.8],[13481,5.0],[15000,1.0]],"2024":[[32,10.0],[500,9.8],[702,9.75],[1000,9.67],[1817,9.5],[2000,9.45],[2970,9.25],[3000,9.22],[4000,9.02],[4102,9.0],[5000,8.77],[6000,8.52],[6131,8.5],[7916,8.0],[8000,7.95],[10000,7.27],[10721,7.0],[12500,6.22],[12966,6.0],[14640,5.0],[15000,4.67]],"2025":[[33,10.0],[500,9.77],[695,9.75],[1000,9.67],[2000,9.5],[3000,9.32],[3596,9.25],[4000,9.17],[5000,9.0],[6000,8.82],[7675,8.5],[8000,8.42],[9736,8.0],[10000,7.9],[12500,7.1],[12820,7.0],[14963,6.0],[15000,5.97],[16275,5.0]],"2026":[[100,9.82],[500,9.67],[1000,9.55],[2000,9.35],[3000,9.15],[4000,8.97],[5000,8.77],[6000,8.55],[8000,8.02],[10000,7.32],[12500,6.17],[15000,4.02]]};
const ANI_ETICHETE = { 2020: "2020ᴬ", 2021: "2021", 2022: "2022", 2023: "2023", 2024: "2024", 2025: "2025", 2026: "2026ᴵ" };
function medieAnLaPozitia(an, pos) {
  const c = POS_MEDIE_ANI[String(an)];
  if (!c) return null;
  if (pos < c[0][0]) return c[0][1];               // deasupra primului punct: clamp la valoarea de top
  if (pos > c[c.length - 1][0]) return null;        // dincolo de ultimul punct real: nu extrapolăm
  for (let i = 0; i < c.length - 1; i++) {
    const [x0, y0] = c[i], [x1, y1] = c[i + 1];
    if (pos >= x0 && pos <= x1) { if (x1 === x0) return y0; return Math.round((y0 + (y1 - y0) * (pos - x0) / (x1 - x0)) * 100) / 100; }
  }
  return null;
}
// ===== REPARTIȚIA PE REGIUNI (B / Ilfov / restul țării) — DOAR 2022 și 2025 =====
// Sursă: baza de date SIIIR (istoric_evaluare_nationala) — coloana judet e populată NUMAI pentru 2022 și 2025;
// pentru ceilalți ani nu există nicio cale de atribuire pe județ în schema actuală (verificat: localitate_sup
// e NULL, iar tabelul unităților școlare nu are coloană de județ). Nu inventăm — afișăm doar ce e verificabil.
// Verificare externă: totalul B 2022 (15.428 medii valide) = EXACT numărul oficial de candidați prezenți din
// statistica ISMB. Format: [banda_de_medie, cumulat≥banda în B, în IF, în restul țării].
const REG_TOTALURI = { 2022: { B: 15428, IF: 3011, REST: 130057 }, 2025: { B: 16949, IF: 3375, REST: 131811 } };
const REG_CUM = {"2022": [[1.0,15428,3011,130057],[1.5,15427,3011,129984],[2.0,15419,3007,129602],[2.5,15388,2986,128509],[3.0,15310,2948,126655],[3.5,15198,2880,123888],[4.0,14989,2764,119773],[4.5,14657,2612,113806],[5.0,14147,2374,105780],[5.5,13465,2092,95967],[6.0,12577,1800,85287],[6.5,11566,1525,73930],[7.0,10415,1248,62819],[7.5,9185,976,51809],[8.0,7873,735,40859],[8.5,6243,492,29407],[9.0,4180,263,17524],[9.5,1772,75,6137],[10.0,39,2,196]], "2025": [[1.0,16949,3375,131811],[1.5,16947,3375,131757],[2.0,16943,3374,131450],[2.5,16917,3358,130414],[3.0,16863,3320,128396],[3.5,16763,3245,125303],[4.0,16593,3124,120932],[4.5,16319,2963,115238],[5.0,15939,2759,107851],[5.5,15386,2516,98998],[6.0,14640,2191,89505],[6.5,13709,1927,79168],[7.0,12543,1608,68281],[7.5,11176,1313,56349],[8.0,9537,1005,44057],[8.5,7529,675,30951],[9.0,5032,341,17280],[9.5,1994,93,5255],[10.0,33,2,50]]};
function cumRegLaMedia(an, m) {
  const T = REG_CUM[String(an)];
  if (!T || m == null) return null;
  if (m <= T[0][0]) return { B: T[0][1], IF: T[0][2], REST: T[0][3] };
  const last = T[T.length - 1];
  if (m >= last[0]) return { B: last[1], IF: last[2], REST: last[3] };
  for (let i = 0; i < T.length - 1; i++) {
    const [b0, B0, I0, R0] = T[i], [b1, B1, I1, R1] = T[i + 1];
    if (m >= b0 && m <= b1) {
      const f = (m - b0) / (b1 - b0);
      return { B: Math.round(B0 + (B1 - B0) * f), IF: Math.round(I0 + (I1 - I0) * f), REST: Math.round(R0 + (R1 - R0) * f) };
    }
  }
  return null;
}

// ===== DISTANȚĂ / TIMP PE JOS — estimare, NU rută reală =====
// Coordonate geocodate o singură dată (Google Places, 1 iulie 2026) pentru toate cele 49 de licee din DATA,
// verificate prin adresa exactă din LiceeB-2026_06.xlsx (nu doar căutare pe nume — la "Ștefan Demetrescu",
// căutarea pe nume dădea o clădire greșită; corectat folosind adresa "Șos. Vitan-Bârzești 11").
const SCHOOL_COORDS = {
  "Gheorghe Lazăr": [44.4347862, 26.0903612], "Sfântul Sava": [44.4415981, 26.0908164],
  "Spiru Haret": [44.4381821, 26.1072193], "Tudor Vianu": [44.4580628, 26.080109],
  "Grigore Moisil": [44.4266085, 26.0411891], "I.L.Caragiale": [44.4584563, 26.095119],
  "Matei Basarab": [44.4302782, 26.1134749], "Gheorghe Șincai": [44.4140656, 26.1039555],
  "Mihai Viteazul": [44.4394141, 26.1251258], "Iulia Hașdeu": [44.4435528, 26.1278131],
  "Cantemir Vodă": [44.4454576, 26.1128451], "Ion Creangă": [44.4234749, 26.1062867],
  "Elena Cuza": [44.4175821, 26.0248277], "Nicolae Iorga": [44.4648995, 26.0702885],
  "Mihai Eminescu": [44.4258139, 26.0956462], "Alexandru Ioan Cuza": [44.4277469, 26.1699278],
  "Ion Neculce": [44.4548067, 26.0731191], "Școala Centrală": [44.4431308, 26.1055284],
  "Miguel de Cervantes": [44.4368927, 26.0839249], "Jean Monnet": [44.4659244, 26.0933393],
  "Ion Barbu": [44.4208696, 26.0612125], "Goethe": [44.4498574, 26.0977432],
  "Tudor Vladimirescu": [44.4337104, 26.0424993], "C.A. Rosetti": [44.4671542, 26.1062542],
  "George Călinescu": [44.4448492, 26.0947447], "Dante Alighieri": [44.417234, 26.15954],
  "V. Madgearu": [44.4464637, 26.1007043], "Emil Racoviță": [44.4356464, 26.1383752],
  "Victor Babeș": [44.4628828, 26.159382], "Ștefan Odobleja": [44.4177934, 26.062478],
  "Alexandru Vlahuță": [44.4582299, 26.0974989], "Nicolae Kretzulescu": [44.4333111, 26.1089195],
  "Ștefan Demetrescu": [44.3922258, 26.1430098], "C-tin Brâncoveanu": [44.48272, 26.049803],
  "Aurel Vlaicu": [44.4659756, 26.0583362], "Eugen Lovinescu": [44.4155386, 26.028239],
  "Octav Onicescu": [44.3863446, 26.1145757], "Marin Preda": [44.459576, 26.0419663],
  "Sfântul Iosif": [44.4011827, 26.1013426], "Benjamin Franklin": [44.4295661, 26.1524015],
  "Ita Wegman": [44.479883, 26.1081425], "A.D.Xenopol": [44.4381774, 26.1202664],
  "Petru Maior": [44.4289014, 26.050425], "Mihail Sadoveanu": [44.4459802, 26.1324915],
  "Dimitrie Bolintineanu": [44.4089815, 26.0693528], "Costin C. Kirițescu": [44.4358686, 26.0313955],
  "Ioan N. Socolescu": [44.4468228, 26.0838666], "Decebal": [44.4080216, 26.1467582],
  "Mircea Eliade": [44.4445961, 26.0499989],
  // +42 licee adăugate 3 iulie 2026 — extindere la toate liceele din București (nu doar cele 49 inițiale)
  "Ady Endre": [44.4430468, 26.1267432], "Anghel Saligny": [44.4321427, 26.1601253],
  "Carol I": [44.4567477, 26.0518388], "Constantin Brâncuși": [44.4787577, 26.1078082],
  "Costin D. Nenițescu": [44.4097295, 26.1757361], "Dacia": [44.3802873, 26.1427913],
  "Dimitrie Gusti": [44.4181024, 26.0694626], "Dimitrie Leonida": [44.4339551, 26.1550666],
  "Dimitrie Paciurea": [44.4841423, 26.0633983], "Dinicu Golescu": [44.4527813, 26.0583631],
  "Dragomir Hurmuzescu": [44.431758, 26.1910844], "Dumitru Moțoc": [44.4103044, 26.0813621],
  "Edmond Nicolau": [44.4792759, 26.1083809], "Elie Radu": [44.4086914, 26.1438617],
  "Energetic": [44.3877029, 26.0904548], "George Coșbuc": [44.4400071, 26.1184244],
  "Gheorghe Airinei": [44.4201476, 26.0243531], "Gheorghe Asachi": [44.4249913, 26.0368524],
  "Grigore Cerchez": [44.4061518, 26.0953191], "Henri Coandă": [44.4931367, 26.0929914],
  "Hermes": [44.4365607, 26.1138166], "Hristo Botev": [44.4456784, 26.08443],
  "Ion I.C. Brătianu": [44.4463233, 26.1321506], "Iuliu Maniu": [44.4348059, 25.975202],
  "Lucian Blaga": [44.4416377, 26.1805774], "Media": [44.4854333, 26.0592268],
  "Mihai Bravu": [44.4192931, 26.1353658], "Mihai I": [44.4665142, 26.0420816],
  "Mircea cel Bătrân": [44.4661433, 26.057437], "Nichita Stănescu": [44.4334684, 26.1695913],
  "Nikola Tesla": [44.4481942, 26.135441], "Nr. 1": [44.3850084, 26.1070786],
  "Petru Poni": [44.4322502, 25.9903452], "Sf. Antim Ivireanu": [44.424346, 26.0289612],
  "Sfântul Pantelimon": [44.4404536, 26.1531246], "Theodor Pallady": [44.4055483, 26.2036784],
  "Timotei Cipariu": [44.4751712, 26.0518203], "Traian": [44.4609392, 26.1130543],
  "Traian Vuia": [44.3925759, 26.1453829], "Valter Mărăcineanu": [44.4674974, 26.0525843],
  "Viaceslav Harnaj": [44.4905193, 26.0855316], "Viilor": [44.4130227, 26.086386],
};
// Punct de plecare implicit: Șos. București-Târgoviște 46 (geocodat 1 iulie 2026). Notă: codul poștal
// (075100) e Chitila/Mogoșoaia, în Ilfov, nu într-un sector al Bucureștiului propriu-zis — nu schimbă
// calculul de distanță, dar e relevant dacă te încurcă etichetarea "sector" de mai jos (nu se aplică aici).
const HOME_DEFAULT = { lat: 44.5140553, lon: 26.0177686, label: "Șos. București-Târgoviște 46" };
function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371, toRad = (d) => d * Math.PI / 180;
  const dLat = toRad(lat2 - lat1), dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
// Estimare timp pe jos din distanța în linie dreaptă: viteză ~4,5 km/h, ×1,3 corecție rețea stradală
// (o rută reală pe stradă e mai lungă decât linia dreaptă). E o ESTIMARE declarată, nu o rută reală —
// pentru mijloace de transport în comun nu există echivalent onest fără date de linii/orare reale.
function estimeazaMinutePeJos(km) { return Math.round(km * 1.3 / 4.5 * 60); }

const PROFIL_COLORS = { Real: "#1a5276", Umanist: "#7d3c98", Tehnic: "#784212", Servicii: "#0E6E6E" };
const TIP_SHORT = { "Colegiul Național": "CN", "Liceul Teoretic": "LT", "Colegiul Național Bilingv": "CNB", "Colegiul Național de Informatică": "CNI", "Liceul Teoretic Bilingv": "LTB", "Colegiul German": "CG", "Colegiul Economic": "CE", "Școala Superioară Comercială": "SSC", "Liceul Teologic Adventist": "LTA" };
const CLS = {
  sigur:   { lab: "SIGUR",      color: "#147a40", bg: "#dff0e6", bd: "#bfe0cb" },
  probabil:{ lab: "PROBABIL",   color: "#1e9e5a", bg: "#eafaf1", bd: "#cdeada" },
  incert:  { lab: "INCERT",     color: "#9a6b12", bg: "var(--gold-soft)", bd: "#E7D29A" },
  improb:  { lab: "IMPROBABIL", color: "#c0392b", bg: "#F3E5E0", bd: "#e8c3b8" },
};

function SimulatorDecizie({ onViewDistribution, matchDistribName }) {
  const [mod, setMod] = useState("pozitie");
  const [pozInput, setPozInput] = useState("3500");
  const [mediaInput, setMediaInput] = useState("9.20");
  const [filtruProfil, setFiltruProfil] = useState("Toate");
  const [filtruSectoare, setFiltruSectoare] = useState([]); // selecție multiplă; gol = toate sectoarele
  const toggleSector = (s) => setFiltruSectoare((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  const [filtruCls, setFiltruCls] = useState("toate");
  const [showValid, setShowValid] = useState(false);
  const [open, setOpen] = useState(null);
  const [selectate, setSelectate] = useState([]); // fișa mea de înscriere: array de r.i, în ordine
  const [urmarite, setUrmarite] = useState([]);   // licee de interes marcate — independent de fișă
  const [doarUrmarite, setDoarUrmarite] = useState(false);
  const [interesQuery, setInteresQuery] = useState("");
  const [home, setHome] = useState(HOME_DEFAULT);
  const [homeLabel, setHomeLabel] = useState(HOME_DEFAULT.label);
  const [sortDistanta, setSortDistanta] = useState(false);
  const [pozInfoInput, setPozInfoInput] = useState("3500");
  const [showIstoricPoz, setShowIstoricPoz] = useState(false);

  const poz = parseInt(String(pozInput).replace(/\D/g, "")) || 0;
  const media = (() => { const x = parseFloat(String(mediaInput).replace(",", ".")); return isNaN(x) ? -1 : x; })();

  const toggleSelect = (i) => setSelectate((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]);
  const toggleUrmarit = (i) => setUrmarite((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]);
  const normDiac = (s) => String(s ?? "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const moveSel = (pos, dir) => setSelectate((prev) => { const arr = [...prev]; const j = pos + dir; if (j < 0 || j >= arr.length) return arr; [arr[pos], arr[j]] = [arr[j], arr[pos]]; return arr; });
  const removeSel = (i) => setSelectate((prev) => prev.filter((x) => x !== i));
  const escHtml = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const [showExport, setShowExport] = useState(false);
  const buildExport = () => {
    const rowsHtml = selectate.map((idx, pos) => {
      const r = DATA[idx]; const cod = CODMAP[String(idx)] || "—";
      const clsPoz = classifyPos(r.pos, poz, r.p); const clsMedie = classifyMedie(r.pos, media, r.p); const pragMedie = medieFromPos(r.pos);
      const marjaProc = r.pos > 0 ? (r.pos - pozEchivalent) / r.pos : 0;
      const ist = istoricLaMarja(marjaProc);
      return `<tr><td>${pos + 1}</td><td>${escHtml(cod)}</td><td>${escHtml(r.n)}</td><td>${escHtml(r.p)}</td><td>${escHtml(r.s)}${r.b ? " (" + escHtml(r.b) + ")" : ""}</td><td>${fmt(r.m)}</td><td>${esteCoada(r) ? "liber (<5,00 istoric)" : fmt(pragMedie) + " ±" + medieBands(r.pos, r.p).b50.toFixed(2).replace(".", ",")}</td><td>${fi(r.pos)}</td><td>${fi(r.pos)} *</td><td>${CLS[clsPoz].lab}</td><td>${CLS[clsMedie].lab}</td><td>~${ist.pooled}% **</td><td></td></tr>`;
    }).join("");
    const headHtml = ["Nr.", "Cod", "Liceu", "Profil", "Specializare", "Ultima medie 2025", "Media est. 2026", "Ultima poz. 2025", "Poz. est. 2026", "Clasif. poz.", "Clasif. medie", "Istoric **", "Observații"].map((h) => `<th>${h}</th>`).join("");
    const html = `<!DOCTYPE html><html lang="ro"><head><meta charset="utf-8"><title>Fișa mea de înscriere — admitere 2026</title><style>
body{font-family:Georgia,'Times New Roman',serif;color:#16202b;padding:28px;max-width:980px;margin:0 auto}
h1{font-size:18px;margin:0 0 4px}
.meta{font-size:11px;color:#43505e;margin-bottom:16px;font-family:Arial,sans-serif}
table{width:100%;border-collapse:collapse;font-size:10.5px;font-family:Arial,sans-serif}
th{text-align:left;padding:4px 5px;border-bottom:2px solid #16202b}
td{padding:4px 5px;border-bottom:1px solid #7c8798}
.foot{font-size:9.5px;color:#43505e;margin-top:10px;font-family:Arial,sans-serif}
@media print{@page{margin:14mm}}
</style></head><body>
<h1>Fișa mea de înscriere — admitere 2026, București</h1>
<div class="meta">Generat din simulator ${APP_VERSIUNE} (${APP_MODIFICAT}) · rang introdus: ${fi(poz)} · medie introdusă: ${fmt(media)} · conversie poziție→medie din distribuția reală EN2026 (finală, după contestații — 8 iulie 2026) · document informativ, nu oficial — confruntă cu broșura ISMB.</div>
<table><thead><tr>${headHtml}</tr></thead><tbody>${rowsHtml}</tbody></table>
<div class="foot">* „Poz. est. 2026" = ultima poziție 2025 (metoda actuală nu ajustează). ** „Istoric" = medie pe 5 tranziții reale 2020-2025 la marjă echivalentă, NU o probabilitate calibrată — acoperirea reală a variat 17%-97% după an (vezi simulatorul pentru detaliul pe an). Clasificarea de bază rămâne categorică. Document generat automat, verifică cu sursele oficiale (ISMB) înainte de a-l folosi la înscriere.</div>
<script>window.onload=function(){setTimeout(function(){window.print();},350);};</script>
</body></html>`;
    const tsvHead = ["Nr.", "Cod", "Liceu", "Profil", "Specializare", "Ultima medie 2025", "Media est. 2026 (±banda)", "Ultima poz. 2025", "Clasif. poz.", "Clasif. medie", "Istoric*"].join("\t");
    const tsvRows = selectate.map((idx, pos) => {
      const r = DATA[idx]; const cod = CODMAP[String(idx)] || "—";
      const clsPoz = classifyPos(r.pos, poz, r.p); const clsMedie = classifyMedie(r.pos, media, r.p); const pragMedie = medieFromPos(r.pos);
      const { b50 } = medieBands(r.pos, r.p);
      const ist = istoricLaMarja(r.pos > 0 ? (r.pos - pozEchivalent) / r.pos : 0);
      return [pos + 1, cod, r.n, r.p, r.s + (r.b ? " (" + r.b + ")" : ""), fmt(r.m), esteCoada(r) ? "liber (<5,00 istoric)" : fmt(pragMedie) + " ±" + b50.toFixed(2).replace(".", ","), fi(r.pos), CLS[clsPoz].lab, CLS[clsMedie].lab, "~" + ist.pooled + "%"].join("\t");
    }).join("\n");
    return { html, tsv: tsvHead + "\n" + tsvRows };
  };
  const handleExport = () => setShowExport(true);
  const tryDownload = () => {
    const { html } = buildExport();
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "Fisa_inscriere_2026.html";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  };
  const copyTsv = async () => {
    const { tsv } = buildExport();
    try { await navigator.clipboard.writeText(tsv); alert("Copiat — lipește în Excel/Word (Ctrl+V)."); }
    catch (e) { alert("Clipboard blocat de browser — selectează textul din casetă și copiază manual (Ctrl+C)."); }
  };
  const copyHtml = async () => {
    const { html } = buildExport();
    try { await navigator.clipboard.writeText(html); alert("HTML copiat — salvează-l ca Fisa_inscriere_2026.html și deschide-l în browser pentru tipărire."); }
    catch (e) { alert("Clipboard blocat de browser — folosește caseta de text."); }
  };

  const pozEchivalent = useMemo(() => mod === "medie" ? pozFromMedie(media) : poz, [mod, poz, media]);

  const rows = useMemo(() => DATA.map((r, i) => {
    let cls, cutoff, margin;
    if (mod === "pozitie") {
      cutoff = r.pos; margin = cutoff - poz;            // pozitiv = ești peste prag (mai sigur)
      const cb = coreBand(cutoff, r.p), sb = safeBand(cutoff, r.p);
      if (margin >= sb) cls = "sigur";
      else if (margin >= cb) cls = "probabil";
      else if (margin >= -cb) cls = "incert";
      else cls = "improb";
    } else {
      const prag = medieFromPos(r.pos); cutoff = prag;
      const m = media - prag;
      // clasificare cu MBAND calibrat pe adâncime + track — identică cu fișa (classifyMedie).
      // Înainte era bandă plată ±0,11, care contrazicea backtestul (benzile plate subestimează
      // eroarea de câteva ori la praguri adânci) și diverga de clasificarea din fișă.
      cls = classifyMedie(r.pos, media, r.p);
      margin = m;
    }
    // marjă proporțională echivalentă (pos - poz)/pos — aceeași scală în ambele moduri, folosită pt. indicatorul istoric
    const marjaProc = r.pos > 0 ? (r.pos - pozEchivalent) / r.pos : 0;
    const ist = istoricLaMarja(marjaProc);
    const coord = SCHOOL_COORDS[r.n];
    const distKm = coord ? haversineKm(home.lat, home.lon, coord[0], coord[1]) : null;
    const walkMin = distKm != null ? estimeazaMinutePeJos(distKm) : null;
    return { ...r, i, cls, cutoff, margin, marjaProc, ist, distKm, walkMin };
  }), [mod, poz, media, pozEchivalent, home]);

  const fisaRows = selectate.map((i) => {
    const r = DATA[i];
    const clsPoz = classifyPos(r.pos, poz, r.p);
    const pragMedie = medieFromPos(r.pos);
    const clsMedie = classifyMedie(r.pos, media, r.p);
    const cod = CODMAP[String(i)] || null;
    const marjaProc = r.pos > 0 ? (r.pos - pozEchivalent) / r.pos : 0;
    const ist = istoricLaMarja(marjaProc);
    return { ...r, i, cod, clsPoz, pragMedie, clsMedie, ist };
  });

  const cnt = { sigur: 0, probabil: 0, incert: 0, improb: 0 };
  rows.forEach((r) => cnt[r.cls]++);
  const profiluri = ["Toate", "Real", "Umanist", "Tehnic", "Servicii", "Resurse naturale si Protecția mediului"];
  const sectoare = ["Toate", "S1", "S2", "S3", "S4", "S5", "S6"];
  let shown = rows;
  if (filtruProfil !== "Toate") shown = shown.filter((r) => r.p === filtruProfil);
  if (filtruSectoare.length > 0) shown = shown.filter((r) => filtruSectoare.includes(r.sec));
  if (filtruCls !== "toate") shown = shown.filter((r) => r.cls === filtruCls);
  if (interesQuery.trim()) { const q = normDiac(interesQuery); shown = shown.filter((r) => normDiac(r.n).includes(q) || normDiac(r.s).includes(q)); }
  if (doarUrmarite) shown = shown.filter((r) => urmarite.includes(r.i));
  if (sortDistanta) shown = [...shown].sort((a, b) => (a.distKm ?? 999) - (b.distKm ?? 999));

  const F = "'Inter', system-ui, sans-serif", M = "'JetBrains Mono', ui-monospace, monospace";
  const ACC = mod === "pozitie" ? "#0E6E6E" : "#1a5276";

  return (
    <div style={{ fontFamily: F, background: "var(--ink)", minHeight: "100%", color: "var(--text)" }}>
      <style>{`.snl-btn{cursor:pointer;transition:.12s}.snl-row:hover{box-shadow:0 2px 8px rgba(0,0,0,.07)}`}</style>

      <div style={{ background: "var(--panel)", color: "var(--text)", padding: "22px 24px 16px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--text-dim)" }}>București · Admitere 2026 · instrument de decizie</div>
          <h1 style={{ margin: "6px 0 0", fontSize: 24, fontWeight: 700, fontFamily: "'Fraunces',serif", letterSpacing: "-.01em" }}>Simulator decizie 2026 — fără examene de limbă, validat pe 5 ani</h1>
          <div style={{ fontSize: 12, color: "var(--text-dim)", marginTop: 6 }}>Folosește rangul tău din ierarhia ISMB (cunoscut la completarea fișei). <b style={{ color: "var(--text)" }}>Citește mai întâi caseta de validare.</b></div>
        </div>
      </div>

      {/* CASETA DE VALIDARE — onestă */}
      <div style={{ background: "var(--panel-raised)", color: "var(--text)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "12px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ fontSize: 12.5, lineHeight: 1.5, maxWidth: 760 }}>
              <b style={{ color: "var(--gold)" }}>Cât te poți baza:</b> ordinea liceelor <b>foarte depărtate</b> e stabilă, dar a celor <b>apropiate nu</b> — la specializări la ≤150 locuri distanță, ordinea se inversează în ~42% din cazuri de la un an la altul (verificat pe 2020-25; ~32% cum se credea inițial era subestimat). Deci nu te baza pe ordinea fină între vecini. Verdictul intri/nu intri: în ani tipici eroarea mediană e ~5,7% din poziție (~336 locuri median, 2022-25), dar aproape jumătate din cazuri se mișcă mai mult; în ani atipici (COVID, salt structural) mult mai mult. Banda e proporțională cu poziția. Am exclus cele 24 de specializări cu examen de limbă (la cererea ta); rămân 158 standard.
            </div>
            <button className="snl-btn" onClick={() => setShowValid(!showValid)} style={{ background: "transparent", color: "var(--gold)", border: "1px solid var(--border)", borderRadius: 6, padding: "6px 12px", fontSize: 12, fontWeight: 600 }}>{showValid ? "ascunde" : "vezi"} backtest 5 ani</button>
          </div>
          {showValid && (
            <div style={{ marginTop: 10, background: "var(--panel)", borderRadius: 8, padding: "10px 12px", fontFamily: M, fontSize: 12 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1.1fr .5fr .7fr .7fr .8fr .8fr 1.3fr", gap: 6, color: "var(--text-dim)", paddingBottom: 6, borderBottom: "1px solid var(--border)" }}>
                <span>tranziție</span><span>n</span><span>MAE</span><span>median</span><span>bias</span><span>&gt;±250</span><span>observație</span>
              </div>
              {VALID.map((v, k) => (
                <div key={k} style={{ display: "grid", gridTemplateColumns: "1.1fr .5fr .7fr .7fr .8fr .8fr 1.3fr", gap: 6, padding: "5px 0", borderBottom: "1px solid var(--border)", color: v.nota.startsWith("an tipic") ? "var(--text)" : "#e8a87c" }}>
                  <span>{v.t}</span><span>{v.n}</span><span>{v.mae}</span><span>{v.med}</span><span>{v.bias > 0 ? "+" : ""}{v.bias}</span><span>{v.over}%</span><span style={{ fontFamily: F, fontSize: 11 }}>{v.nota}</span>
                </div>
              ))}
              <div style={{ color: "var(--text-dim)", fontFamily: F, fontSize: 11, marginTop: 8 }}>Unități = locuri în ierarhia București. Panel complet (nu top50) — n variază 212-325 specializări/tranziție (specializări noi/eliminate diferă între ani). MAE variază de la 329 (2024→25) la 920 (2023→24, salt structural); bias alternează semn la fiecare tranziție — niciun an nu e stabil „tipic" din an în an. „&gt;±250" = % specializări cu eroare de poziție peste 250 locuri. Sursă: LiceeB-2026_06.xlsx, poziții „Ultima poziție la ADMITERE".</div>
            </div>
          )}
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "18px 24px 56px" }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
          {[["pozitie", "Pe poziție", "recomandat — rangul tău din ierarhie"], ["medie", "Pe medie", "dacă știi doar media — conversie din poziție"]].map(([k, t, d]) => (
            <button key={k} className="snl-btn" onClick={() => setMod(k)} style={{ flex: 1, textAlign: "left", padding: "11px 15px", borderRadius: 8, border: "2px solid " + (mod === k ? "#0E6E6E" : "var(--border)"), background: mod === k ? "#e6f1f1" : "var(--panel-raised)", boxShadow: mod === k ? "0 0 0 3px #0E6E6E22" : "none" }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: mod === k ? "#0E6E6E" : "var(--text-dim)" }}>{t}</div>
              <div style={{ fontSize: 11.5, color: "var(--text-dim)", marginTop: 2 }}>{d}</div>
            </button>
          ))}
        </div>

        <div style={{ background: "var(--panel-raised)", borderRadius: 10, padding: "18px 22px", marginBottom: 14, boxShadow: "0 1px 4px rgba(0,0,0,.08)" }}>
          {mod === "pozitie" ? (
            <div>
              <div style={{ fontSize: 11, color: "var(--text-dim)", marginBottom: 6, fontWeight: 600, letterSpacing: 1 }}>POZIȚIA TA ÎN IERARHIA BUCUREȘTI 2026</div>
              <input type="text" inputMode="numeric" value={pozInput} onChange={(e) => setPozInput(e.target.value)} style={{ width: 140, fontFamily: M, fontSize: 30, fontWeight: 600, padding: "6px 12px", border: "2px solid #0E6E6E", borderRadius: 8, textAlign: "center", color: "#0E6E6E", outline: "none" }} />
              <div style={{ fontSize: 11.5, color: "var(--text-dim)", marginTop: 6 }}>numărul din <b>ierarhia EN București</b> publicată pe admitere.edu.ro (9 iulie, 15.422 candidați) — cu cât mai mic, cu atât mai sus. <b>Atenție:</b> la înscriere (13-20 iulie) vei vedea și o ierarhie care include candidați din alte județe (~2.500 în plus) — NU introduce poziția de acolo; toate calculele de aici sunt pe baza ierarhiei EN București. Pozițiile prag nu sunt ajustate cu numărul de locuri — backtestul a arătat că ajustarea adaugă bias.</div>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: 11, color: "var(--text-dim)", marginBottom: 6, fontWeight: 600, letterSpacing: 1 }}>MEDIA TA LA EN 2026</div>
              <input type="number" min="1" max="10" step="0.01" value={mediaInput} onChange={(e) => setMediaInput(e.target.value)} style={{ width: 96, fontFamily: M, fontSize: 30, fontWeight: 600, padding: "6px 10px", border: "2px solid " + ACC, borderRadius: 8, textAlign: "center", color: ACC, outline: "none" }} />
              <div style={{ fontSize: 11.5, color: "var(--text-dim)", marginTop: 10, lineHeight: 1.5 }}>Conversia poziție → medie este calculată din distribuția reală EN 2026. Sunt rezultatele <b>finale, după soluționarea contestațiilor</b> — publicate 8 iulie 2026, ierarhia București 9 iulie 2026. Banda de incertitudine e <b>calibrată pe adâncimea pragului</b> (backtest pe 5 ani, 1.266 predicții): ±0,03-0,05 la praguri de top, ±0,10 la mijloc, până la ±0,6 la praguri adânci. Metoda pe poziție rămâne mai stabilă decât cea pe medie.</div>
              {(() => { const rg = medieRange(media); return rg
                ? <div style={{ fontSize: 11.5, color: "var(--text)", marginTop: 6, fontFamily: M }}>media {fmt(media)} = pozițiile <b>{fi(rg[1])}–{fi(rg[2])}</b> în ierarhia EN 2026 ({fi(rg[2]-rg[1]+1)} candidați cu medie egală — departajați între ei după criteriile oficiale, pe care simulatorul nu le vede; conversia pe medie folosește un punct din acest interval, nu poziția ta exactă)</div>
                : <div style={{ fontSize: 11.5, color: "#B45309", marginTop: 6 }}>niciun candidat din ierarhia EN 2026 nu are exact media {fmt(media)} — verifică valoarea introdusă (mediile reale există doar în pași de min. 0,02)</div>; })()}
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
          {[["sigur", cnt.sigur], ["probabil", cnt.probabil], ["incert", cnt.incert], ["improb", cnt.improb]].map(([k, n]) => {
            const c = CLS[k], act = filtruCls === k;
            const sub = mod === "pozitie"
              ? (k === "sigur" ? "marjă robustă peste prag (~17%)" : k === "probabil" ? "peste prag, marjă mică" : k === "incert" ? "în zona coin-flip (~6%)" : "sub pragul de rang")
              : (k === "sigur" ? "peste prag + banda P90" : k === "probabil" ? "peste prag + banda P50" : k === "incert" ? "în ±banda P50" : "sub prag");
            return (
              <button key={k} className="snl-btn" onClick={() => setFiltruCls(act ? "toate" : k)} style={{ flex: "1 1 140px", textAlign: "left", border: "1px solid " + (act ? c.color : c.bd), background: act ? c.bg : "var(--panel-raised)", borderRadius: 8, padding: "9px 13px", boxShadow: act ? "inset 3px 0 0 " + c.color : "none" }}>
                <div style={{ fontFamily: M, fontSize: 22, fontWeight: 600, color: c.color }}>{n}</div>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: c.color }}>{c.lab}</div>
                <div style={{ fontSize: 10.5, color: "var(--text-dim)", marginTop: 2 }}>{sub}</div>
              </button>
            );
          })}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 12, flexWrap: "wrap", marginBottom: 10 }}>
          <div style={{ fontFamily: "'Fraunces',serif", fontSize: 19, fontWeight: 600 }}>{shown.length} specializări{urmarite.length > 0 ? ` · ${urmarite.length} urmărite` : ""}</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {profiluri.map((p) => (
              <button key={p} className="snl-btn" onClick={() => setFiltruProfil(p)} style={{ padding: "5px 11px", borderRadius: 18, fontSize: 12, fontWeight: 600, border: "1px solid " + (filtruProfil === p ? "#16202b" : "var(--border)"), background: filtruProfil === p ? "#16202b" : "var(--panel-raised)", color: filtruProfil === p ? "#fff" : "var(--text-dim)" }}>{p}</button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14, alignItems: "center" }}>
          <span style={{ fontSize: 11, color: "var(--text-dim)", fontWeight: 600, marginRight: 2 }}>SECTOARE (selecție multiplă)</span>
          {sectoare.map((s) => {
            const activ = s === "Toate" ? filtruSectoare.length === 0 : filtruSectoare.includes(s);
            return (
              <button key={s} className="snl-btn" onClick={() => s === "Toate" ? setFiltruSectoare([]) : toggleSector(s)} style={{ padding: "5px 11px", borderRadius: 18, fontSize: 12, fontWeight: 600, border: "1px solid " + (activ ? "#1a5276" : "var(--border)"), background: activ ? "#eaf1f8" : "var(--panel-raised)", color: activ ? "#1a5276" : "var(--text-dim)" }}>{s === "Toate" ? "Toate" : (activ ? "✓ " : "") + s}</button>
            );
          })}
          {filtruSectoare.length > 0 && <span style={{ fontSize: 10.5, color: "var(--text-dim)" }}>{filtruSectoare.length} selectate</span>}
        </div>

        <div style={{ background: "var(--panel-raised)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 14px", marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
            <div style={{ fontSize: 11, color: "var(--text-dim)" }}>
              <b style={{ color: "var(--text)" }}>Punct de plecare:</b> {homeLabel} <span style={{ fontFamily: M, color: "var(--text-faint)" }}>({home.lat.toFixed(5)}, {home.lon.toFixed(5)})</span>
            </div>
            <button className="snl-btn" onClick={() => setSortDistanta(!sortDistanta)} style={{ border: "1px solid " + (sortDistanta ? "#1a5276" : "var(--border)"), background: sortDistanta ? "#eaf1f8" : "var(--panel-raised)", color: sortDistanta ? "#1a5276" : "var(--text-dim)", borderRadius: 6, padding: "5px 11px", fontSize: 11.5, fontWeight: 600 }}>{sortDistanta ? "✓ sortat după distanță" : "sortează după distanță"}</button>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap", alignItems: "center" }}>
            <input type="number" step="0.0001" value={home.lat} onChange={(e) => { const lat = parseFloat(e.target.value); if (!isNaN(lat)) { setHome((h) => ({ ...h, lat })); setHomeLabel("(coordonate editate manual)"); } }} style={{ width: 100, fontFamily: M, fontSize: 12, padding: "5px 8px", border: "1px solid var(--border)", borderRadius: 6 }} />
            <input type="number" step="0.0001" value={home.lon} onChange={(e) => { const lon = parseFloat(e.target.value); if (!isNaN(lon)) { setHome((h) => ({ ...h, lon })); setHomeLabel("(coordonate editate manual)"); } }} style={{ width: 100, fontFamily: M, fontSize: 12, padding: "5px 8px", border: "1px solid var(--border)", borderRadius: 6 }} />
            <span style={{ fontSize: 10.5, color: "var(--text-faint)" }}>lat, lon — schimbă doar dacă vrei alt punct de plecare decât cel implicit</span>
          </div>
          <div style={{ fontSize: 10.5, color: "var(--text-dim)", marginTop: 6, lineHeight: 1.4 }}>Distanța de mai jos e în linie dreaptă, cu o estimare de timp pe jos (viteză ~4,5 km/h × 1,3 pentru rețeaua stradală) — NU e o rută reală. Nu există echivalent pentru mijloace de transport în comun fără date reale de linii/orare.</div>
        </div>

        <div style={{ background: "var(--panel-raised)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 14px", marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, cursor: "pointer" }} onClick={() => setShowIstoricPoz(!showIstoricPoz)}>
            <div style={{ fontFamily: "'Fraunces',serif", fontSize: 15, fontWeight: 600 }}>📊 Ce medie a fost la o poziție, pe ani (2020-2026) — informativ</div>
            <span style={{ fontSize: 12, color: "var(--text-dim)" }}>{showIstoricPoz ? "▲ ascunde" : "▼ arată"}</span>
          </div>
          {showIstoricPoz && (() => {
            const pInfo = parseInt(String(pozInfoInput).replace(/\D/g, "")) || 0;
            const ani = [2020, 2021, 2022, 2023, 2024, 2025, 2026];
            const medii = ani.map((a) => ({ an: a, m: pInfo > 0 ? medieAnLaPozitia(a, pInfo) : null }));
            return (
              <div style={{ marginTop: 10 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10, flexWrap: "wrap" }}>
                  <label style={{ fontSize: 12, color: "var(--text-dim)", fontWeight: 600 }}>Poziția în ierarhie:</label>
                  <input type="text" inputMode="numeric" value={pozInfoInput} onChange={(e) => setPozInfoInput(e.target.value)} style={{ width: 90, fontFamily: M, fontSize: 13, padding: "6px 9px", border: "1px solid var(--border)", borderRadius: 6 }} />
                  <button className="snl-btn" onClick={() => setPozInfoInput(String(poz))} style={{ border: "1px solid var(--border)", background: "var(--panel-raised)", borderRadius: 6, padding: "6px 10px", fontSize: 11.5, color: "var(--text-dim)" }}>← preia poziția mea ({fi(poz)})</button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6, marginBottom: 6 }}>
                  {medii.map(({ an, m }) => (
                    <div key={an} style={{ textAlign: "center", background: an === 2026 ? "#eef3f8" : "var(--panel)", border: "1px solid " + (an === 2026 ? "#bccde0" : "var(--border)"), borderRadius: 6, padding: "7px 4px" }}>
                      <div style={{ fontSize: 10.5, color: "var(--text-dim)" }}>{ANI_ETICHETE[an]}</div>
                      <div style={{ fontFamily: M, fontSize: 15, fontWeight: 700 }}>{m == null ? "—" : fmt(m)}</div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 10, color: "var(--text-dim)", lineHeight: 1.5, marginBottom: 12 }}>
                  Media candidatului aflat pe poziția {fi(pInfo)} în ierarhia București a fiecărui an. ᴬ 2020 = ierarhia de admitere (reconstruită din pragurile specializărilor — altă bază de numărare). 2021-2025 = ierarhia EN după contestații. ᴵ 2026 = EN după contestații (rezultate finale, 8 iulie). „—" = poziția depășește datele disponibile ale acelui an. Se vede clar deflația 2026: la aceeași poziție, medie mai mică decât în orice an din 2021 încoace.
                </div>
                {(() => {
                  const blocks = [2022, 2025].map((an) => {
                    const m = pInfo > 0 ? medieAnLaPozitia(an, pInfo) : null;
                    const c = m != null ? cumRegLaMedia(an, m) : null;
                    return { an, m, c };
                  });
                  return (
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".04em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 5 }}>Câți candidați au avut media ≥ media acelei poziții — București / Ilfov / restul țării</div>
                      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr 1fr 1fr", gap: "4px 12px", fontFamily: M, fontSize: 12.5, alignItems: "center" }}>
                        <span style={{ fontFamily: F, fontSize: 10.5, color: "var(--text-dim)" }}></span>
                        <span style={{ fontFamily: F, fontSize: 10.5, color: "var(--text-dim)", fontWeight: 700 }}>București</span>
                        <span style={{ fontFamily: F, fontSize: 10.5, color: "var(--text-dim)", fontWeight: 700 }}>Ilfov</span>
                        <span style={{ fontFamily: F, fontSize: 10.5, color: "var(--text-dim)", fontWeight: 700 }}>Restul țării</span>
                        {blocks.map(({ an, m, c }) => (
                          [<span key={an + "l"} style={{ fontFamily: F, fontSize: 11.5, fontWeight: 600 }}>{an} {m != null ? `(≥ ${fmt(m)})` : ""}</span>,
                           <span key={an + "b"}>{c ? fi(c.B) : "—"} <span style={{ color: "var(--text-faint)", fontSize: 10 }}>din {fi(REG_TOTALURI[an].B)}</span></span>,
                           <span key={an + "i"}>{c ? fi(c.IF) : "—"} <span style={{ color: "var(--text-faint)", fontSize: 10 }}>din {fi(REG_TOTALURI[an].IF)}</span></span>,
                           <span key={an + "r"}>{c ? fi(c.REST) : "—"} <span style={{ color: "var(--text-faint)", fontSize: 10 }}>din {fi(REG_TOTALURI[an].REST)}</span></span>]
                        ))}
                      </div>
                      <div style={{ fontSize: 10, color: "var(--text-dim)", marginTop: 7, lineHeight: 1.5 }}>
                        Numai 2022 și 2025: în sursa de date (SIIIR), județul candidatului există doar pentru acești doi ani — pentru restul nu afișăm cifre pe care nu le putem verifica. Cumulat interpolat în benzi de 0,5 puncte (aproximativ la sutime). Verificare: totalul București 2022 (15.428) coincide exact cu numărul oficial de candidați prezenți. Relevanța pentru admiterea B: candidații din Ilfov cu medii mari sunt principala sursă de concurență din afara orașului (~2.500 de înscriși din alte județe la admiterea B în fiecare an).
                      </div>
                    </div>
                  );
                })()}
              </div>
            );
          })()}
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap", alignItems: "center" }}>
          <input type="text" placeholder="Caută liceu sau specializare (ex: Lazăr, Mate-Info)…" value={interesQuery} onChange={(e) => setInteresQuery(e.target.value)} style={{ flex: "1 1 260px", fontSize: 13, padding: "8px 12px", border: "1px solid var(--border)", borderRadius: 8, outline: "none", fontFamily: F }} />
          {interesQuery && <button className="snl-btn" onClick={() => setInteresQuery("")} style={{ border: "1px solid var(--border)", background: "var(--panel-raised)", borderRadius: 8, padding: "8px 10px", fontSize: 12, color: "var(--text-dim)" }}>✕ șterge</button>}
          <button className="snl-btn" onClick={() => setDoarUrmarite(!doarUrmarite)} disabled={urmarite.length === 0} style={{ border: "1px solid " + (doarUrmarite ? "var(--gold)" : "var(--border)"), background: doarUrmarite ? "var(--gold-soft)" : "var(--panel-raised)", color: doarUrmarite ? "#9a6b12" : urmarite.length === 0 ? "var(--text-faint)" : "var(--text-dim)", borderRadius: 8, padding: "8px 12px", fontSize: 12.5, fontWeight: 600 }}>★ {doarUrmarite ? "arată toate" : `arată doar urmărite (${urmarite.length})`}</button>
        </div>

        <div>
          {shown.map((r) => {
            const isOpen = open === r.i, c = CLS[r.cls], pc = PROFIL_COLORS[r.p] || "var(--text-dim)";
            return (
              <div key={r.i} className="snl-row" style={{ background: "var(--panel-raised)", border: "1px solid var(--border)", borderLeft: "3px solid " + c.color, boxShadow: r.star ? "0 0 0 1px var(--gold) inset, 0 0 0 1px var(--gold)" : "none", borderRadius: 5, marginBottom: 7, overflow: "hidden" }}>
                <div className="snl-btn" onClick={() => setOpen(isOpen ? null : r.i)} style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 14, alignItems: "center", padding: "11px 14px" }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14.5, display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>{r.star && <span style={{ color: "var(--gold)" }}>★</span>}{r.n}<span style={{ fontWeight: 500, color: "var(--text-dim)", fontSize: 11.5 }}>{TIP_SHORT[r.t] || r.t}</span></div>
                    <div style={{ fontSize: 13, color: "var(--text-dim)", marginTop: 2 }}><span style={{ color: pc, fontWeight: 600 }}>{r.p}</span> — {r.s}{r.b ? " · " + r.b : ""}</div>
                    <div style={{ fontSize: 11.5, color: "var(--text-dim)", marginTop: 3, display: "flex", gap: 12, flexWrap: "wrap" }}><span>{r.sec}</span><span>{r.l} locuri 2026</span><span>rang #{r.r}</span>{r.distKm != null && <span>🚶 ~{r.walkMin} min · {r.distKm.toFixed(1)} km*</span>}</div>
                  </div>
                  <div style={{ textAlign: "right", minWidth: 120 }}>
                    {mod === "pozitie" ? (<>
                      <div style={{ fontFamily: M, fontSize: 17, fontWeight: 600 }}>poz ≤ {fi(r.cutoff)}</div>
                      <div style={{ fontSize: 9.5, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--text-dim)" }}>prag rang (real 2025)</div>
                      <div style={{ fontFamily: M, fontSize: 11, color: "var(--text-dim)", marginTop: 2 }}>marja ta: {r.margin >= 0 ? "+" : ""}{fi(r.margin)}</div>
                    </>) : (<>
                      <div style={{ fontFamily: M, fontSize: 17, fontWeight: 600, color: ACC }}>{esteCoada(r) ? "<5,00" : fmt(r.cutoff)}</div>
                      <div style={{ fontSize: 9.5, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--text-dim)" }}>{esteCoada(r) ? "intrare liberă (istoric)" : "prag medie est. 2026"}</div>
                      <div style={{ fontFamily: M, fontSize: 11, color: "var(--text-dim)", marginTop: 2 }}>real 2025: {fmt(r.m)}</div>
                    </>)}
                  </div>
                  <div style={{ minWidth: 96, textAlign: "right" }}>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 3, background: c.bg, color: c.color, border: "1px solid " + c.bd }}>{c.lab}</span>
                    <div style={{ fontSize: 10, color: "var(--text-dim)", marginTop: 3, fontFamily: M }}>istoric ~{r.ist.pooled}%*</div>
                    <div style={{ display: "flex", gap: 4, justifyContent: "flex-end", marginTop: 5 }}>
                      <button className="snl-btn" onClick={(e) => { e.stopPropagation(); toggleUrmarit(r.i); }} title="urmărește (independent de fișă)" style={{ fontSize: 13, padding: "3px 6px", borderRadius: 4, border: "1px solid " + (urmarite.includes(r.i) ? "var(--gold)" : "var(--border)"), background: urmarite.includes(r.i) ? "var(--gold-soft)" : "var(--panel-raised)", color: urmarite.includes(r.i) ? "var(--gold)" : "var(--text-faint)" }}>★</button>
                      {matchDistribName(r.n) && (
                        <button className="snl-btn" onClick={(e) => { e.stopPropagation(); onViewDistribution(r.n); }} title="vezi distribuția istorică 2024/2025 pentru acest liceu" style={{ fontSize: 10, fontWeight: 600, padding: "3px 7px", borderRadius: 4, border: "1px solid var(--border)", background: "var(--panel-raised)", color: "var(--text-dim)" }}>📊 distribuție</button>
                      )}
                      {r.l === 0
                        ? <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 4, background: "#FDECEA", color: "#8f2f21", border: "1px solid #E5B5AF" }}>0 locuri 2026</span>
                        : <button className="snl-btn" onClick={(e) => { e.stopPropagation(); toggleSelect(r.i); }} style={{ fontSize: 10.5, fontWeight: 600, padding: "3px 8px", borderRadius: 4, border: "1px solid " + (selectate.includes(r.i) ? "#0E6E6E" : "var(--border)"), background: selectate.includes(r.i) ? "#0E6E6E" : "var(--panel-raised)", color: selectate.includes(r.i) ? "#fff" : "var(--text-dim)" }}>{selectate.includes(r.i) ? "✓ în fișă" : "+ fișă"}</button>}
                    </div>
                  </div>
                </div>
                {isOpen && (
                  <div style={{ borderTop: "1px dashed var(--border)", padding: "12px 14px", background: "var(--panel)", fontSize: 12.5, color: "var(--text-dim)" }}>
                    <div style={{ fontFamily: M, fontSize: 12.5, background: "var(--panel-raised)", border: "1px solid var(--border)", borderRadius: 3, padding: "9px 11px", lineHeight: 1.7 }}>
                      {mod === "pozitie"
                        ? <span>prag rang 2026 ≈ ultima poziție 2025 = <b>{fi(r.cutoff)}</b> · bandă ±{fi(coreBand(r.cutoff, r.p))}/±{fi(safeBand(r.cutoff, r.p))}<br />poziția ta {fi(poz)} → marjă {r.margin >= 0 ? "+" : ""}{fi(r.margin)} locuri → {r.cls === "sigur" ? <span style={{ color: CLS.sigur.color, fontWeight: 600 }}>peste prag cu marjă robustă → cel mai sigur</span> : r.cls === "probabil" ? <span style={{ color: CLS.probabil.color, fontWeight: 600 }}>peste prag, marjă mică → probabil intri</span> : r.cls === "incert" ? <span style={{ color: CLS.incert.color, fontWeight: 600 }}>în zona coin-flip → incert</span> : <span style={{ color: CLS.improb.color, fontWeight: 600 }}>sub pragul de rang → improbabil</span>}<br /><span style={{ color: "var(--text-dim)", fontWeight: 400 }}>scenariu cohortă 2026 (candidați −10,7%, locuri {r.l5}→{r.l}): prag rang ≈ {fi(pragScenariuCohorta(r))} — presupune preferințe relative stabile; în afara domeniului backtestului (nicio tranziție istorică cu șoc de cohortă comparabil); estimarea principală rămâne cea directă</span></span>
                        : esteCoada(r)
                        ? <span>specializare <b>istoric neumplută</b>: pragul 2025 ({fmt(r.m)}) e sub 5,00 — ultimul admis a fost ultimul care a ales-o, nu o barieră de competiție. Nu afișăm un „prag estimat 2026" cu zecimale pentru că poziția prag ({fi(r.pos)}) depășește ierarhia EN2026 (15.422 candidați cu medie validă) — percentilă peste 100%, clampată. Practic: orice medie a intrat istoric. Verifică în schimb dacă profilul chiar corespunde intereselor — la aceste licee criteriul de decizie nu e pragul.</span>
                        : <span>prag medie 2026 = interpolare din distribuția reală EN2026 la percentila poziției prag ({(r.pos/TOTAL_EN2026_B*100).toFixed(1)}%, poz. {fi(r.pos)}) = <b>{fmt(r.cutoff)}</b> · bandă ±{medieBands(r.pos, r.p).b50.toFixed(2).replace(".",",")}/±{medieBands(r.pos, r.p).b90.toFixed(2).replace(".",",")} (calibrată pe adâncime și track)<br />media ta {fmt(media)} → {r.cls === "sigur" || r.cls === "probabil" ? <span style={{ color: CLS[r.cls].color, fontWeight: 600 }}>peste prag</span> : r.cls === "incert" ? <span style={{ color: CLS.incert.color, fontWeight: 600 }}>în banda de incertitudine</span> : <span style={{ color: CLS.improb.color, fontWeight: 600 }}>sub prag</span>}<br /><span style={{ color: "var(--text-dim)", fontWeight: 400 }}>scenariu ierarhie de admitere (corecție istorică 2024, un singur an de date): prag ≈ {fmt(r.cutoff + corectieV1V3(r.pos))} — pragul real tinde să fie mai mic; estimarea principală e cea conservatoare</span></span>}
                    </div>
                    <div style={{ marginTop: 8, color: "var(--text-dim)", fontSize: 12 }}>Reper real 2025: ultima medie {fmt(r.m)} · ultima poziție {fi(r.pos)} · prima medie {fmt(r.pm)} · {r.l5} locuri.</div>
                    {r.b && /cu examen/.test(r.b) && <div style={{ marginTop: 6, color: "#B45309", fontSize: 11.5, fontWeight: 600 }}>⚠ Secție bilingvă CU probă de limbă: admiterea cere promovarea probei — poziția/media NU garantează nimic fără ea. Pragul istoric reflectă doar candidații care au promovat proba; secțiile cu examen au instabilitate istorică mai mare și sunt excluse din statisticile de stabilitate de mai jos.</div>}
                    {r.l === 0 && <div style={{ marginTop: 6, color: "#B91C1C", fontSize: 11.5, fontWeight: 700 }}>⚠ FĂRĂ LOCURI ÎN 2026 — broșura nu alocă niciun loc acestei specializări anul acesta (neofertată). NU poate fi trecută pe fișă; e afișată doar ca reper istoric.</div>}
                    {r.distKm != null && <div style={{ marginTop: 4, color: "var(--text-dim)", fontSize: 11 }}>* {r.distKm.toFixed(2)} km în linie dreaptă de la {homeLabel} · ~{r.walkMin} min pe jos (estimare, nu rută reală) — pentru mijloace de transport în comun, verifică pe Google Maps/Moovit sau cere-mi ruta exactă pentru acest liceu.</div>}
                    <div style={{ marginTop: 10, background: "var(--panel-raised)", border: "1px solid var(--border)", borderRadius: 4, padding: "8px 10px" }}>
                      <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".04em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 5 }}>Istoric — marjă echivalentă ~{(r.marjaProc*100).toFixed(1)}% · nu e o probabilitate calibrată</div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr) auto", gap: 6, fontFamily: M, fontSize: 11.5 }}>
                        {HIST_YEARS.map((y, k) => (
                          <div key={y} style={{ textAlign: "center" }}>
                            <div style={{ color: "var(--text-faint)", fontSize: 9.5 }}>{y}</div>
                            <div style={{ fontWeight: 700, color: r.ist.ani[k] < 50 ? "#c0392b" : r.ist.ani[k] < 80 ? "#9a6b12" : "#147a40" }}>{r.ist.ani[k]}%</div>
                          </div>
                        ))}
                        <div style={{ textAlign: "center", borderLeft: "1px solid var(--border)", paddingLeft: 8 }}>
                          <div style={{ color: "var(--text-faint)", fontSize: 9.5 }}>medie 5 ani</div>
                          <div style={{ fontWeight: 700 }}>{r.ist.pooled}%</div>
                        </div>
                      </div>
                      <div style={{ fontSize: 10.5, color: "var(--text-dim)", marginTop: 6, lineHeight: 1.5 }}>
                        Din 5 tranziții reale (2020-2025), la o marjă similară, câte specializări au rămas efectiv sub prag anul următor — pe fiecare an separat. Variază enorm (ex. {Math.min(...r.ist.ani)}%-{Math.max(...r.ist.ani)}% la marja ta) pentru că anii nu sunt echivalenți: unul are salt structural, doi sunt afectați de COVID. Media pe 5 ani nu e o șansă reală — e un rezumat care ascunde exact această instabilitate.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          {shown.length === 0 && <div style={{ padding: 24, textAlign: "center", color: "var(--text-dim)" }}>Nicio specializare în acest filtru.</div>}
        </div>

        <div style={{ marginTop: 22, background: "var(--panel-raised)", borderRadius: 10, padding: "16px 18px", boxShadow: "0 1px 4px rgba(0,0,0,.08)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: selectate.length ? 10 : 0 }}>
            <div style={{ fontFamily: "'Fraunces',serif", fontSize: 16, fontWeight: 600 }}>📋 Fișa mea de înscriere ({selectate.length})</div>
            {selectate.length > 0 && <button className="snl-btn" onClick={handleExport} style={{ background: "#0E6E6E", color: "#fff", border: "none", borderRadius: 6, padding: "8px 14px", fontSize: 12.5, fontWeight: 700 }}>⬇ Exportă fișa</button>}
          </div>
          {selectate.length === 0 && <div style={{ fontSize: 12.5, color: "var(--text-dim)" }}>Apasă „+ fișă" la specializările care te interesează, în ordinea reală a preferinței.</div>}
          {selectate.length > 0 && (() => {
            const nSigur = selectate.filter((idx) => classifyPos(DATA[idx].pos, poz, DATA[idx].p) === "sigur").length;
            const nOptiuni = selectate.length;
            return (
            <div>
              {nSigur === 0 && (
                <div style={{ background: "#FDECEA", border: "1px solid #E5B5AF", borderRadius: 6, padding: "9px 12px", fontSize: 12, color: "#8f2f21", marginBottom: 10, lineHeight: 1.5 }}>
                  <b>⚠ Fișa nu conține nicio opțiune SIGUR (după poziție).</b> Dacă niciun prag nu se dovedește accesibil, candidatul rămâne nerepartizat în etapa I (în 2025: 261 de candidați nerepartizați). Adaugă cel puțin 1-2 opțiuni cu marjă robustă la finalul listei.
                </div>
              )}
              {nOptiuni > 0 && nOptiuni < 5 && nSigur > 0 && (
                <div style={{ background: "var(--gold-soft)", border: "1px solid #E0C88F", borderRadius: 6, padding: "9px 12px", fontSize: 12, color: "#7a5c10", marginBottom: 10, lineHeight: 1.5 }}>
                  <b>Fișă scurtă ({nOptiuni} opțiuni).</b> Pe fișa reală nu există un cost pentru opțiuni suplimentare — o listă mai lungă doar reduce riscul de nerepartizare.
                </div>
              )}
              <div style={{ background: "#eef3f8", border: "1px solid #bccde0", borderRadius: 6, padding: "9px 12px", fontSize: 11.5, color: "#2b4a68", marginBottom: 10, lineHeight: 1.5 }}>
                <b>Ordinea corectă = strict preferința reală.</b> Algoritmul de repartizare (serial dictatorship, cf. ghid ISMB) îți dă prima opțiune de pe fișă la care poziția ta se califică — a pune o opțiune „sigură" deasupra uneia preferate NU crește nicio șansă, doar te poate plasa mai jos decât ai fi putut. Pune întâi ce îți dorești (chiar INCERT), apoi plasa de siguranță.
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "26px 1.4fr .5fr .7fr .7fr .7fr .7fr .55fr auto", gap: 6, fontSize: 10.5, color: "var(--text-dim)", padding: "4px 0", borderBottom: "1px solid var(--border)", textTransform: "uppercase", letterSpacing: ".04em" }}>
                <span>#</span><span>Liceu / specializare</span><span>Cod</span><span>Medie 2025→est.2026</span><span>Poz. 2025→est.2026</span><span>Clasif. poziție</span><span>Clasif. medie</span><span title="medie pe 5 tranziții istorice, nu probabilitate">Istoric*</span><span></span>
              </div>
              {selectate.map((idx, pos) => {
                const r = DATA[idx]; const cod = CODMAP[String(idx)] || "—";
                const clsPoz = classifyPos(r.pos, poz, r.p); const clsMedie = classifyMedie(r.pos, media, r.p); const pragMedie = medieFromPos(r.pos);
                const marjaProc = r.pos > 0 ? (r.pos - pozEchivalent) / r.pos : 0;
                const ist = istoricLaMarja(marjaProc);
                return (
                  <div key={idx} style={{ display: "grid", gridTemplateColumns: "26px 1.4fr .5fr .7fr .7fr .7fr .7fr .55fr auto", gap: 6, alignItems: "center", padding: "7px 0", borderBottom: "1px solid var(--border)", fontSize: 12 }}>
                    <span style={{ fontFamily: M, color: "var(--text-dim)" }}>{pos + 1}</span>
                    <span><b>{r.n}</b> <span style={{ color: "var(--text-dim)" }}>— {r.s}{r.b ? " · " + r.b : ""}</span></span>
                    <span style={{ fontFamily: M, color: cod === "—" ? "#c0392b" : "var(--text-dim)" }}>{cod}</span>
                    <span style={{ fontFamily: M }}>{esteCoada(r) ? <span>{fmt(r.m)} → liber</span> : <span>{fmt(r.m)} → {fmt(pragMedie)} <span style={{ color: "var(--text-faint)" }}>±{medieBands(r.pos, r.p).b50.toFixed(2).replace(".", ",")}</span></span>}</span>
                    <span style={{ fontFamily: M }}>{fi(r.pos)} → {fi(r.pos)}</span>
                    <span style={{ fontWeight: 700, color: CLS[clsPoz].color }}>{CLS[clsPoz].lab}</span>
                    <span style={{ fontWeight: 700, color: CLS[clsMedie].color }}>{CLS[clsMedie].lab}</span>
                    <span style={{ fontFamily: M, color: "var(--text-dim)" }}>~{ist.pooled}%</span>
                    <span style={{ display: "flex", gap: 3, justifyContent: "flex-end" }}>
                      <button className="snl-btn" onClick={() => moveSel(pos, -1)} disabled={pos === 0} style={{ border: "none", background: "none", color: pos === 0 ? "var(--text-faint)" : "#0E6E6E", fontSize: 13 }}>↑</button>
                      <button className="snl-btn" onClick={() => moveSel(pos, 1)} disabled={pos === selectate.length - 1} style={{ border: "none", background: "none", color: pos === selectate.length - 1 ? "var(--text-faint)" : "#0E6E6E", fontSize: 13 }}>↓</button>
                      <button className="snl-btn" onClick={() => removeSel(idx)} style={{ border: "none", background: "none", color: "#c0392b", fontSize: 13 }}>✕</button>
                    </span>
                  </div>
                );
              })}
              <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 8, lineHeight: 1.5 }}>
                „Poz. 2025→est.2026" arată aceeași cifră de ambele părți — metoda actuală presupune poziția neschimbată (persistență), nu e o predicție independentă. Clasificarea de bază rămâne categorică (SIGUR/PROBABIL/INCERT/IMPROBABIL) — nu există un model de probabilitate calibrat pe date suficiente. Coloana „Istoric*" e o medie pe 5 tranziții reale (2020-2025), NU o probabilitate: acoperirea reală a variat între 17% și 97% pentru aceeași marjă, în funcție de an (vezi „★" pe fiecare specializare pentru detaliul pe an). Codurile marcate „—" ({DATA.length - Object.keys(CODMAP).length} din {DATA.length}) n-au fost găsite în lista de coduri disponibilă — verifică-le pe broșura oficială ISMB înainte de completarea fișei reale. Notă: lista de coduri sursă (Coduri_licee) acoperă doar filiera Teoretică (Real/Umanist) — pentru Tehnic/Servicii/Resurse naturale nu există niciun cod în sursele disponibile, nu doar o potrivire ratată.
              </div>
            </div>
            );
          })()}
        </div>

        {showExport && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(11,18,32,.55)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }} onClick={() => setShowExport(false)}>
            <div style={{ background: "var(--panel-raised)", borderRadius: 10, maxWidth: 760, width: "100%", maxHeight: "86vh", overflow: "auto", padding: "18px 20px", boxShadow: "0 8px 40px rgba(0,0,0,.35)" }} onClick={(e) => e.stopPropagation()}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: 17, fontWeight: 600 }}>Export fișă ({selectate.length} opțiuni)</div>
                <button className="snl-btn" onClick={() => setShowExport(false)} style={{ border: "1px solid var(--border)", background: "var(--panel-raised)", borderRadius: 6, padding: "4px 10px", fontSize: 13, color: "var(--text-dim)" }}>✕</button>
              </div>
              <div style={{ fontSize: 11.5, color: "var(--text-dim)", lineHeight: 1.5, marginBottom: 10 }}>
                În această previzualizare (sandbox), descărcarea directă de fișiere e blocată de browser — folosește <b>copierea</b>: lipești direct în Excel/Word. Butonul de descărcare rămâne funcțional când rulezi simulatorul în afara acestei ferestre.
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
                <button className="snl-btn" onClick={copyTsv} style={{ background: "#0E6E6E", color: "#fff", border: "none", borderRadius: 6, padding: "8px 14px", fontSize: 12.5, fontWeight: 700 }}>📋 Copiază tabelul (Excel/Word)</button>
                <button className="snl-btn" onClick={copyHtml} style={{ border: "1px solid #0E6E6E", background: "var(--panel-raised)", color: "#0E6E6E", borderRadius: 6, padding: "8px 14px", fontSize: 12.5, fontWeight: 700 }}>📄 Copiază HTML (document tipăribil)</button>
                <button className="snl-btn" onClick={tryDownload} style={{ border: "1px solid var(--border)", background: "var(--panel-raised)", color: "var(--text-dim)", borderRadius: 6, padding: "8px 14px", fontSize: 12.5 }}>⬇ Încearcă descărcarea</button>
              </div>
              <div style={{ fontSize: 10.5, color: "var(--text-dim)", marginBottom: 4, textTransform: "uppercase", letterSpacing: ".04em" }}>Sau selectează manual din caseta de mai jos (Ctrl+A, Ctrl+C):</div>
              <textarea readOnly value={buildExport().tsv} onFocus={(e) => e.target.select()} style={{ width: "100%", height: 180, fontFamily: M, fontSize: 10.5, border: "1px solid var(--border)", borderRadius: 6, padding: 8, whiteSpace: "pre", boxSizing: "border-box" }} />
            </div>
          </div>
        )}

        <div style={{ marginTop: 26, borderTop: "1px solid var(--border)", paddingTop: 16, fontSize: 12.5, color: "var(--text-dim)", lineHeight: 1.6 }}>
          <div style={{ fontFamily: "'Fraunces',serif", fontSize: 15, fontWeight: 600, color: "var(--text)", marginBottom: 6 }}>Ce arată validarea pe 5 ani (citește)</div>
          <ul style={{ margin: "6px 0 0", paddingLeft: 18 }}>
            <li><b>Ordonare — nuanțat:</b> corelația globală de rang e ~0,99 pe ani tipici (scade la ~0,97 în ani COVID), dar e o iluzie: o produc perechile foarte depărtate. La vecini apropiați (≤150 locuri) ordinea se inversează în ~42% din cazuri (≤400 locuri: ~32%) — verificat direct pe date, mai instabil decât arăta versiunea anterioară (32%/22%). Folosește instrumentul pentru grupe mari (vârf / mijloc / jos), nu pentru a ordona fin licee aproape egale — acolo tratează-le ca la egalitate.</li>
            <li><b>Verdictul exact e mai puțin sigur:</b> metoda nimerește bine în ani tipici (eroare mediană ~336 locuri, ~5,7%), dar în 2 din 5 transiții (COVID 2020–2021) și 1 cu salt structural (2023→2024, bias +892, pe panel complet) a greșit mult. Nu trata pragul de rang ca pe o linie fixă.</li>
            <li><b>Clasele (bandă proporțională) — recalibrate PE ADÂNCIME (v2):</b> benzile fixe 6%/17% acopereau neuniform: 62,5-78,4% (core) și 87,9-97,3% (safe) în funcție de segmentul de poziție. Acum core=P75 și safe=P95 din shift-urile reale, pe segmente interpolate — acoperire uniformă ~72-77% / ~93-97%. Contraintuitiv, dar măsurat: pragurile de TOP au nevoie de benzi relative mai largi (11,6%/30,6% sub poz. 2.000) decât mijlocul (4-6%/15-17%) — pozițiile mici oscilează relativ mult de la an la an.</li>
            <li><b>Testat și respins:</b> media pozițiilor pe 3 ani (2022-24) ca predictor pentru 2025 — MAE 483 vs 292 pentru ultimul an singur (2024), pe același eșantion comparabil (n=292, necesită poziție validă în toți cei 4 ani). Ultimul an rămâne cel mai bun predictor; nu netezesc.</li>
            <li><b>Testat și respins:</b> modularea benzilor cu densitatea la prag — corelația brută densitate–|Δprag| pare puternică (−0,50, n=111 specializări împerecheate 2024→25), dar se prăbușește la −0,24 după controlul adâncimii pragului: densitatea re-codifică în mare parte adâncimea, deja prezentă în MBAND. Semnal rezidual prea slab pe un singur an de tranziție.</li>
            <li><b>Adăugat (iulie 2026):</b> cele 21 de secții bilingve cu probă de limbă lipsă din simulator (Sava/Spiru/Cantemir/Creangă/Hașdeu/Caragiale/Cuza/Iorga/Cervantes/ȘC/Vlahuță/Dante/Decebal engleză·germană·franceză·spaniolă·italiană) — praguri și poziții proprii din broșura 2026, marcate distinct cu avertisment. Tot atunci: corectate 9 coduri de fișă greșite pre-existente (secțiile fără examen purtau codul secției-pereche cu examen la Caragiale/ȘC/Vlahuță; Goethe, Dante maternă, Botev materne — verificate sistematic contra Coduri_licee, zero duplicate).</li>
            <li><b>Corecție față de versiunea anterioară:</b> banda ±250 era prea îngustă (acoperă doar ~55–73%), iar ajustarea cu numărul de locuri adăuga bias — am eliminat-o. Pragurile de rang nu se scalează cu locurile.</li>
            <li><b>Puncte slabe (red team):</b> am scos cele 24 de specializări cu examen de limbă — acolo se concentra cea mai mare instabilitate. Rămân riscuri: la prag sunt ~120–165 candidați cu aceeași medie, departajați după media de gimnaziu (criteriu pe care modelul nu îl vede); anii cu schimbare structurală (ex. 2023→2024, bias +892 pe panel complet) deplasează tot; poziția ta oficială ISMB poate fi pe alt univers de numărare decât pragurile din date — verific-o pe un punct cunoscut.</li>
            <li><b>Regula pentru fișă:</b> pune întâi opțiunile dorite (chiar INCERT), apoi destule SIGUR mai jos. Tratează drept asigurate doar specializările SIGUR cu marjă mare. Confruntă cu broșura oficială ISMB.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// ===== PUNTE ÎNTRE CELE DOUĂ SETURI DE DATE =====
// Simulatorul foloseşte nume scurte ("Tudor Vianu"). Distribuţia foloseşte
// numele oficial complet, cu numele scurt între ghilimele
// ("Colegiul Naţional de Informatică „Tudor Vianu""). Egalitate exactă nu
// funcţionează — verificăm dacă numele scurt normalizat apare în numele lung
// normalizat. Verificat pe date reale: 31/91 licee din Simulator au corespondent
// în top-30 (2024 şi/sau 2025); 0 fals-pozitive la verificare manuală.
const DISTRIB_LONG_NAMES = (() => {
  const set = new Set();
  Object.values(DATA_BY_YEAR).forEach((yearObj) => {
    yearObj.licee.forEach((l) => set.add(l.nume));
  });
  return [...set];
})();

function matchDistribName(simulatorSchoolName) {
  const ns = normalizeName(simulatorSchoolName);
  return DISTRIB_LONG_NAMES.find((long) => normalizeName(long).includes(ns)) || null;
}

export default function App() {
  const [theme, setTheme] = useState("light");
  const [activeTab, setActiveTab] = useState("decizie");
  const [focusLiceu, setFocusLiceu] = useState(null);

  function goToDistributie(simulatorSchoolName) {
    const canonical = matchDistribName(simulatorSchoolName);
    if (!canonical) return;
    setFocusLiceu(canonical);
    setActiveTab("distributie");
  }

  return (
    <div className={"appShell " + theme}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..700&family=JetBrains+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap');

        * { box-sizing: border-box; }

        .appShell {
          --ink: #14161C;
          --panel: #1B1E27;
          --panel-raised: #21242F;
          --border: #2C3040;
          --text: #EDEAE1;
          --text-dim: #93908A;
          --text-faint: #5C5A56;
          --accent: #C1352E;
          --accent-soft: rgba(193, 53, 46, 0.16);
          --gold: #C9A24B;
          --gold-soft: rgba(201, 162, 75, 0.14);

          display: flex;
          flex-direction: column;
          height: 100vh;
          min-height: 640px;
          background: var(--ink);
          color: var(--text);
          font-family: 'Inter', system-ui, sans-serif;
          transition: background 0.2s, color 0.2s;
        }

        .appShell.light {
          --ink: #E8E5DC;
          --panel: #FBFAF6;
          --panel-raised: #FFFFFF;
          --border: #D9D5C8;
          --text: #1D1B17;
          --text-dim: #6B675E;
          --text-faint: #A6A192;
          --accent: #B3312C;
          --accent-soft: rgba(179, 49, 44, 0.09);
          --gold: #9C7A22;
          --gold-soft: rgba(156, 122, 34, 0.12);
        }

        .topNav {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          padding: 12px 20px;
          background: var(--panel);
          border-bottom: 1px solid var(--border);
          flex-wrap: wrap;
        }
        .topNavLeft { display: flex; align-items: center; gap: 18px; flex-wrap: wrap; }
        .topNavTitle {
          font-family: 'Fraunces', serif;
          font-size: 15px;
          font-weight: 600;
          color: var(--gold);
          letter-spacing: -.01em;
          white-space: nowrap;
        }
        .tabRow { display: flex; gap: 6px; }
        .tabBtn {
          font-family: 'Inter', sans-serif;
          font-size: 12.5px;
          font-weight: 600;
          padding: 7px 14px;
          border-radius: 7px;
          border: 1px solid var(--border);
          background: var(--panel-raised);
          color: var(--text-dim);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: .12s;
        }
        .tabBtn svg { width: 13px; height: 13px; }
        .tabBtn:hover { border-color: var(--gold); color: var(--text); }
        .tabBtn.active {
          background: var(--gold);
          border-color: var(--gold);
          color: var(--ink);
        }
        .themeToggleShared {
          display: flex;
          align-items: center;
          gap: 6px;
          background: var(--panel-raised);
          border: 1px solid var(--border);
          border-radius: 7px;
          padding: 6px 11px;
          font-size: 11.5px;
          color: var(--text-dim);
          cursor: pointer;
          font-family: 'Inter', sans-serif;
        }
        .themeToggleShared:hover { border-color: var(--gold); color: var(--text); }
        .themeToggleShared svg { width: 13px; height: 13px; }

        .tabBody {
          flex: 1 1 auto;
          min-height: 0;
          overflow: auto;
        }
      `}</style>

      <div className="topNav">
        <div className="topNavLeft">
          <div className="topNavTitle">Admitere București <span style={{ fontSize: 10.5, fontWeight: 400, color: "var(--text-dim)", marginLeft: 6 }}>{APP_VERSIUNE} · {APP_MODIFICAT}</span></div>
          <div className="tabRow">
            <button
              className={"tabBtn" + (activeTab === "decizie" ? " active" : "")}
              onClick={() => setActiveTab("decizie")}
            >
              <ListChecks /> Decizie 2026
            </button>
            <button
              className={"tabBtn" + (activeTab === "distributie" ? " active" : "")}
              onClick={() => setActiveTab("distributie")}
            >
              <LayoutDashboard /> Distribuție istorică
            </button>
          </div>
        </div>
        <button
          className="themeToggleShared"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          title="Schimbă tema"
        >
          {theme === "dark" ? <Sun /> : <Moon />}
          {theme === "dark" ? "Light" : "Dark"}
        </button>
      </div>

      <div className="tabBody">
        {activeTab === "decizie" ? (
          <SimulatorDecizie onViewDistribution={goToDistributie} matchDistribName={matchDistribName} />
        ) : (
          <DistributieIstorica
            theme={theme}
            focusLiceu={focusLiceu}
            onFocusHandled={() => setFocusLiceu(null)}
          />
        )}
      </div>
    </div>
  );
}
