"use strict";
// HDD — get-specs: ficha técnica de fábrica para autocompletado del CMS.
// GET /.netlify/functions/get-specs?model=MARCA_Y_MODELO
// Sin API keys ni servicios externos: base de conocimiento local + matching difuso.
// Todos los campos devueltos son EDITABLES en el CMS (el editor puede corregir).

const DB = [
  // ---------- Lenovo ThinkPad ----------
  { keys: ["lenovo thinkpad x280", "thinkpad x280", "x280"], specs: { marca: "Lenovo", modelo: "ThinkPad X280", año: 2018, procesador: "Intel Core i5-8250U (4 núcleos, hasta 3.4 GHz)", ram: "8GB DDR4 soldada", almacenamiento: "256GB SSD M.2 NVMe", pantalla: '12.5" Full HD (1920x1080) antirreflejo', gpu: "Intel UHD Graphics 620", so_actual: "Windows 10 Pro", puertos: ["2x Thunderbolt 3 (USB-C)", "2x USB-A 3.0", "HDMI", "Jack 3.5mm", "Ethernet (dongle)"], peso: "1.3 kg" } },
  { keys: ["lenovo thinkpad t480", "thinkpad t480", "t480"], specs: { marca: "Lenovo", modelo: "ThinkPad T480", año: 2018, procesador: "Intel Core i5-8250U (4 núcleos, hasta 3.4 GHz)", ram: "8GB DDR4 (ampliable a 32GB)", almacenamiento: "256GB SSD M.2 NVMe", pantalla: '14" Full HD (1920x1080) antirreflejo', gpu: "Intel UHD Graphics 620", so_actual: "Windows 10 Pro", puertos: ["Thunderbolt 3 (USB-C)", "USB-C 3.1", "2x USB-A 3.0", "HDMI", "Jack 3.5mm", "Ethernet", "microSD"], peso: "1.58 kg" } },
  { keys: ["lenovo thinkpad t490", "thinkpad t490", "t490"], specs: { marca: "Lenovo", modelo: "ThinkPad T490", año: 2019, procesador: "Intel Core i5-8265U (4 núcleos, hasta 3.9 GHz)", ram: "8GB DDR4 (ampliable)", almacenamiento: "256GB SSD M.2 NVMe", pantalla: '14" Full HD (1920x1080) antirreflejo', gpu: "Intel UHD Graphics 620", so_actual: "Windows 10 Pro", puertos: ["2x Thunderbolt 3 (USB-C)", "2x USB-A 3.0", "HDMI", "Jack 3.5mm", "Ethernet (dongle)", "microSD"], peso: "1.49 kg" } },
  { keys: ["lenovo thinkpad x390", "thinkpad x390", "x390"], specs: { marca: "Lenovo", modelo: "ThinkPad X390", año: 2019, procesador: "Intel Core i5-8265U (4 núcleos, hasta 3.9 GHz)", ram: "8GB DDR4 soldada", almacenamiento: "256GB SSD M.2 NVMe", pantalla: '13.3" Full HD (1920x1080) antirreflejo', gpu: "Intel UHD Graphics 620", so_actual: "Windows 10 Pro", puertos: ["2x Thunderbolt 3 (USB-C)", "2x USB-A 3.0", "HDMI", "Jack 3.5mm", "microSD"], peso: "1.22 kg" } },
  { keys: ["lenovo thinkpad l480", "thinkpad l480", "l480"], specs: { marca: "Lenovo", modelo: "ThinkPad L480", año: 2018, procesador: "Intel Core i5-8250U (4 núcleos, hasta 3.4 GHz)", ram: "8GB DDR4 (ampliable a 32GB)", almacenamiento: "256GB SSD M.2 NVMe", pantalla: '14" Full HD (1920x1080) antirreflejo', gpu: "Intel UHD Graphics 620", so_actual: "Windows 10 Pro", puertos: ["USB-C 3.1", "2x USB-A 3.0", "HDMI", "Jack 3.5mm", "Ethernet", "microSD"], peso: "1.68 kg" } },
  { keys: ["lenovo thinkpad e480", "thinkpad e480", "e480"], specs: { marca: "Lenovo", modelo: "ThinkPad E480", año: 2018, procesador: "Intel Core i5-8250U (4 núcleos, hasta 3.4 GHz)", ram: "8GB DDR4 (ampliable)", almacenamiento: "256GB SSD M.2 NVMe", pantalla: '14" Full HD (1920x1080) antirreflejo', gpu: "Intel UHD Graphics 620", so_actual: "Windows 10 Pro", puertos: ["USB-C 3.1", "2x USB-A 3.0", "HDMI", "Jack 3.5mm", "Ethernet", "microSD"], peso: "1.75 kg" } },
  { keys: ["lenovo thinkpad e490", "thinkpad e490", "e490"], specs: { marca: "Lenovo", modelo: "ThinkPad E490", año: 2019, procesador: "Intel Core i5-8265U (4 núcleos, hasta 3.9 GHz)", ram: "8GB DDR4 (ampliable)", almacenamiento: "256GB SSD M.2 NVMe", pantalla: '14" Full HD (1920x1080) antirreflejo', gpu: "Intel UHD Graphics 620", so_actual: "Windows 10 Pro", puertos: ["USB-C 3.1", "2x USB-A 3.0", "HDMI", "Jack 3.5mm", "Ethernet", "microSD"], peso: "1.75 kg" } },
  { keys: ["lenovo thinkpad e14", "thinkpad e14", "e14 gen"], specs: { marca: "Lenovo", modelo: "ThinkPad E14", año: 2020, procesador: "Intel Core i5-10210U (4 núcleos, hasta 4.2 GHz)", ram: "8GB DDR4 (ampliable)", almacenamiento: "256GB SSD M.2 NVMe", pantalla: '14" Full HD (1920x1080) antirreflejo', gpu: "Intel UHD Graphics", so_actual: "Windows 10 Pro", puertos: ["USB-C 3.1", "2x USB-A 3.0", "HDMI", "Jack 3.5mm", "Ethernet", "microSD"], peso: "1.41 kg" } },
  // ---------- Lenovo IdeaPad / ThinkBook ----------
  { keys: ["lenovo ideapad 5 15", "ideapad 5 15", "ideapad 5"], specs: { marca: "Lenovo", modelo: "IdeaPad 5 15.6", año: 2021, procesador: "AMD Ryzen 5 5500U (6 núcleos, hasta 4.0 GHz)", ram: "8GB DDR4 soldada", almacenamiento: "512GB SSD M.2 NVMe", pantalla: '15.6" Full HD (1920x1080) antirreflejo', gpu: "AMD Radeon Graphics integrada", so_actual: "Windows 10 Home", puertos: ["USB-C 3.2", "2x USB-A 3.2", "HDMI", "Jack 3.5mm", "Lector SD"], peso: "1.66 kg" } },
  { keys: ["lenovo ideapad 3 15", "ideapad 3 15", "ideapad 3"], specs: { marca: "Lenovo", modelo: "IdeaPad 3 15.6", año: 2021, procesador: "Intel Core i3-1115G4 (2 núcleos, hasta 4.1 GHz)", ram: "8GB DDR4", almacenamiento: "256GB SSD M.2 NVMe", pantalla: '15.6" Full HD (1920x1080) antirreflejo', gpu: "Intel UHD Graphics", so_actual: "Windows 10 Home", puertos: ["USB-C 3.2", "2x USB-A 3.2", "HDMI", "Jack 3.5mm", "Lector SD"], peso: "1.7 kg" } },
  { keys: ["lenovo ideapad slim 5", "ideapad slim 5", "slim 5"], specs: { marca: "Lenovo", modelo: "IdeaPad Slim 5 15.6", año: 2022, procesador: "AMD Ryzen 5 7530U (6 núcleos, hasta 4.5 GHz)", ram: "8GB LPDDR4x soldada", almacenamiento: "512GB SSD M.2 NVMe", pantalla: '15.6" Full HD (1920x1080) antirreflejo', gpu: "AMD Radeon Graphics integrada", so_actual: "Windows 11 Home", puertos: ["USB-C 3.2", "2x USB-A 3.2", "HDMI", "Jack 3.5mm", "Lector SD"], peso: "1.62 kg" } },
  { keys: ["lenovo thinkbook 14", "thinkbook 14", "thinkbook"], specs: { marca: "Lenovo", modelo: "ThinkBook 14 G4", año: 2022, procesador: "Intel Core i5-1235U (10 núcleos, hasta 4.4 GHz)", ram: "8GB DDR4 (ampliable)", almacenamiento: "512GB SSD M.2 NVMe", pantalla: '14" Full HD (1920x1080) antirreflejo', gpu: "Intel Iris Xe Graphics", so_actual: "Windows 11 Pro", puertos: ["Thunderbolt 4 (USB-C)", "USB-C 3.2", "2x USB-A 3.2", "HDMI", "Jack 3.5mm", "Ethernet", "Lector SD"], peso: "1.4 kg" } },
  // ---------- HP ----------
  { keys: ["hp elitebook 840 g5", "elitebook 840 g5", "840 g5"], specs: { marca: "HP", modelo: "EliteBook 840 G5", año: 2018, procesador: "Intel Core i5-8250U (4 núcleos, hasta 3.4 GHz)", ram: "8GB DDR4 (ampliable a 32GB)", almacenamiento: "256GB SSD M.2 NVMe", pantalla: '14" Full HD (1920x1080) antirreflejo', gpu: "Intel UHD Graphics 620", so_actual: "Windows 10 Pro", puertos: ["Thunderbolt 3 (USB-C)", "USB-C 3.1", "2x USB-A 3.0", "HDMI", "Jack 3.5mm", "Ethernet", "microSD"], peso: "1.48 kg" } },
  { keys: ["hp elitebook 840 g6", "elitebook 840 g6", "840 g6"], specs: { marca: "HP", modelo: "EliteBook 840 G6", año: 2019, procesador: "Intel Core i5-8265U (4 núcleos, hasta 3.9 GHz)", ram: "8GB DDR4 (ampliable a 32GB)", almacenamiento: "256GB SSD M.2 NVMe", pantalla: '14" Full HD (1920x1080) antirreflejo', gpu: "Intel UHD Graphics 620", so_actual: "Windows 10 Pro", puertos: ["Thunderbolt 3 (USB-C)", "USB-C 3.1", "2x USB-A 3.0", "HDMI", "Jack 3.5mm", "Ethernet", "microSD"], peso: "1.48 kg" } },
  { keys: ["hp elitebook 840 g7", "elitebook 840 g7", "840 g7"], specs: { marca: "HP", modelo: "EliteBook 840 G7", año: 2020, procesador: "Intel Core i5-10210U (4 núcleos, hasta 4.2 GHz)", ram: "8GB DDR4 (ampliable)", almacenamiento: "256GB SSD M.2 NVMe", pantalla: '14" Full HD (1920x1080) antirreflejo', gpu: "Intel UHD Graphics", so_actual: "Windows 10 Pro", puertos: ["2x Thunderbolt 3 (USB-C)", "2x USB-A 3.1", "HDMI", "Jack 3.5mm", "microSD"], peso: "1.36 kg" } },
  { keys: ["hp probook 450 g6", "probook 450 g6", "450 g6"], specs: { marca: "HP", modelo: "ProBook 450 G6", año: 2019, procesador: "Intel Core i5-8265U (4 núcleos, hasta 3.9 GHz)", ram: "8GB DDR4 (ampliable)", almacenamiento: "256GB SSD M.2 NVMe", pantalla: '15.6" Full HD (1920x1080) antirreflejo', gpu: "Intel UHD Graphics 620", so_actual: "Windows 10 Pro", puertos: ["USB-C 3.1", "2x USB-A 3.0", "HDMI", "Jack 3.5mm", "Ethernet", "Lector SD"], peso: "2.0 kg" } },
  { keys: ["hp probook 450 g7", "probook 450 g7", "450 g7"], specs: { marca: "HP", modelo: "ProBook 450 G7", año: 2020, procesador: "Intel Core i5-10210U (4 núcleos, hasta 4.2 GHz)", ram: "8GB DDR4 (ampliable)", almacenamiento: "256GB SSD M.2 NVMe", pantalla: '15.6" Full HD (1920x1080) antirreflejo', gpu: "Intel UHD Graphics", so_actual: "Windows 10 Pro", puertos: ["USB-C 3.1", "2x USB-A 3.0", "HDMI", "Jack 3.5mm", "Ethernet", "Lector SD"], peso: "2.0 kg" } },
  { keys: ["hp pavilion 15", "pavilion 15"], specs: { marca: "HP", modelo: "Pavilion 15", año: 2021, procesador: "Intel Core i5-1135G7 (4 núcleos, hasta 4.2 GHz)", ram: "8GB DDR4", almacenamiento: "512GB SSD M.2 NVMe", pantalla: '15.6" Full HD (1920x1080) antirreflejo', gpu: "Intel Iris Xe Graphics", so_actual: "Windows 10 Home", puertos: ["USB-C 3.2", "2x USB-A", "HDMI", "Jack 3.5mm", "Lector SD", "Ethernet"], peso: "1.75 kg" } },
  { keys: ["hp 250 g7", "250 g7", "hp 250"], specs: { marca: "HP", modelo: "250 G7 15.6", año: 2019, procesador: "Intel Core i5-8265U (4 núcleos, hasta 3.9 GHz)", ram: "8GB DDR4 (ampliable)", almacenamiento: "256GB SSD M.2 NVMe", pantalla: '15.6" Full HD (1920x1080) antirreflejo', gpu: "Intel UHD Graphics 620", so_actual: "Windows 10 Pro", puertos: ["USB-C 3.1", "2x USB-A", "HDMI", "Jack 3.5mm", "Ethernet", "Lector SD"], peso: "1.78 kg" } },
  // ---------- Dell ----------
  { keys: ["dell latitude 5400", "latitude 5400", "5400"], specs: { marca: "Dell", modelo: "Latitude 5400", año: 2019, procesador: "Intel Core i5-8265U (4 núcleos, hasta 3.9 GHz)", ram: "8GB DDR4 (ampliable a 32GB)", almacenamiento: "256GB SSD M.2 NVMe", pantalla: '14" Full HD (1920x1080) antirreflejo', gpu: "Intel UHD Graphics 620", so_actual: "Windows 10 Pro", puertos: ["Thunderbolt 3 (USB-C)", "USB-C 3.1", "2x USB-A 3.0", "HDMI", "Jack 3.5mm", "Ethernet", "microSD"], peso: "1.37 kg" } },
  { keys: ["dell latitude 5410", "latitude 5410", "5410"], specs: { marca: "Dell", modelo: "Latitude 5410", año: 2020, procesador: "Intel Core i5-10210U (4 núcleos, hasta 4.2 GHz)", ram: "8GB DDR4 (ampliable)", almacenamiento: "256GB SSD M.2 NVMe", pantalla: '14" Full HD (1920x1080) antirreflejo', gpu: "Intel UHD Graphics", so_actual: "Windows 10 Pro", puertos: ["2x Thunderbolt 3 (USB-C)", "2x USB-A 3.1", "HDMI", "Jack 3.5mm", "Ethernet", "microSD"], peso: "1.36 kg" } },
  { keys: ["dell latitude 5420", "latitude 5420", "5420"], specs: { marca: "Dell", modelo: "Latitude 5420", año: 2021, procesador: "Intel Core i5-1135G7 (4 núcleos, hasta 4.2 GHz)", ram: "8GB DDR4 (ampliable)", almacenamiento: "256GB SSD M.2 NVMe", pantalla: '14" Full HD (1920x1080) antirreflejo', gpu: "Intel Iris Xe Graphics", so_actual: "Windows 10 Pro", puertos: ["2x Thunderbolt 4 (USB-C)", "2x USB-A 3.2", "HDMI 2.0", "Jack 3.5mm", "Ethernet", "microSD"], peso: "1.36 kg" } },
  { keys: ["dell latitude 5500", "latitude 5500", "5500"], specs: { marca: "Dell", modelo: "Latitude 5500", año: 2019, procesador: "Intel Core i5-8265U (4 núcleos, hasta 3.9 GHz)", ram: "8GB DDR4 (ampliable)", almacenamiento: "256GB SSD M.2 NVMe", pantalla: '15.6" Full HD (1920x1080) antirreflejo', gpu: "Intel UHD Graphics 620", so_actual: "Windows 10 Pro", puertos: ["Thunderbolt 3 (USB-C)", "USB-C 3.1", "2x USB-A 3.0", "HDMI", "Jack 3.5mm", "Ethernet", "microSD"], peso: "1.82 kg" } },
  { keys: ["dell xps 13 9300", "xps 13 9300", "xps 13"], specs: { marca: "Dell", modelo: "XPS 13 9300", año: 2020, procesador: "Intel Core i5-1035G1 (4 núcleos, hasta 3.6 GHz)", ram: "8GB LPDDR4x soldada", almacenamiento: "256GB SSD M.2 NVMe", pantalla: '13.4" Full HD+ (1920x1200) InfinityEdge', gpu: "Intel UHD Graphics", so_actual: "Windows 10 Home", puertos: ["2x Thunderbolt 3 (USB-C)", "microSD", "Jack 3.5mm"], peso: "1.2 kg" } },
  { keys: ["dell inspiron 15 3501", "inspiron 15 3501", "inspiron 3501", "inspiron 15"], specs: { marca: "Dell", modelo: "Inspiron 15 3501", año: 2021, procesador: "Intel Core i5-1135G7 (4 núcleos, hasta 4.2 GHz)", ram: "8GB DDR4", almacenamiento: "256GB SSD M.2 NVMe", pantalla: '15.6" Full HD (1920x1080) antirreflejo', gpu: "Intel Iris Xe Graphics", so_actual: "Windows 10 Home", puertos: ["USB-C 3.2", "2x USB-A", "HDMI", "Jack 3.5mm", "Lector SD", "Ethernet"], peso: "1.83 kg" } },
  // ---------- Apple ----------
  { keys: ["apple macbook pro 13 2020 m1", "macbook pro 13 m1", "macbook pro m1"], specs: { marca: "Apple", modelo: "MacBook Pro 13 M1 (2020)", año: 2020, procesador: "Apple M1 (8 núcleos CPU / 8 núcleos GPU)", ram: "8GB unificada", almacenamiento: "256GB SSD NVMe", pantalla: '13.3" Retina (2560x1600)', gpu: "Apple M1 integrada", so_actual: "macOS", puertos: ["2x Thunderbolt 3 (USB-C)", "Jack 3.5mm"], peso: "1.4 kg" } },
  { keys: ["apple macbook pro 13 2019", "macbook pro 13 2019", "macbook pro 2019", "a1989"], specs: { marca: "Apple", modelo: "MacBook Pro 13 (2019)", año: 2019, procesador: "Intel Core i5-8257U (4 núcleos, hasta 3.9 GHz)", ram: "8GB LPDDR3 soldada", almacenamiento: "256GB SSD NVMe", pantalla: '13.3" Retina (2560x1600)', gpu: "Intel Iris Plus Graphics 645", so_actual: "macOS", puertos: ["2x Thunderbolt 3 (USB-C)", "Jack 3.5mm"], peso: "1.37 kg" } },
  { keys: ["apple macbook air 2020 m1", "macbook air m1", "macbook air 2020", "a2337"], specs: { marca: "Apple", modelo: "MacBook Air M1 (2020)", año: 2020, procesador: "Apple M1 (8 núcleos CPU / 7 núcleos GPU)", ram: "8GB unificada", almacenamiento: "256GB SSD NVMe", pantalla: '13.3" Retina (2560x1600)', gpu: "Apple M1 integrada", so_actual: "macOS", puertos: ["2x Thunderbolt 3 (USB-C)", "Jack 3.5mm"], peso: "1.29 kg" } },
  { keys: ["apple macbook air 2017", "macbook air 2017", "macbook air 13 2017", "a1466"], specs: { marca: "Apple", modelo: "MacBook Air 13 (2017)", año: 2017, procesador: "Intel Core i5-5350U (2 núcleos, hasta 2.9 GHz)", ram: "8GB LPDDR3 soldada", almacenamiento: "128GB SSD PCIe", pantalla: '13.3" (1440x900) antirreflejo', gpu: "Intel HD Graphics 6000", so_actual: "macOS", puertos: ["Thunderbolt 2", "2x USB-A 3.0", "MagSafe 2", "Lector SD", "Jack 3.5mm"], peso: "1.35 kg" } },
  // ---------- Asus / Acer ----------
  { keys: ["asus x515ja", "x515ja", "asus x515", "vivobook 15 x515"], specs: { marca: "Asus", modelo: "VivoBook 15 X515JA", año: 2021, procesador: "Intel Core i5-1035G1 (4 núcleos, hasta 3.6 GHz)", ram: "8GB DDR4", almacenamiento: "512GB SSD M.2 NVMe", pantalla: '15.6" Full HD (1920x1080) antirreflejo', gpu: "Intel UHD Graphics", so_actual: "Windows 10 Home", puertos: ["USB-C 3.2", "USB-A 3.2", "2x USB-A 2.0", "HDMI", "Jack 3.5mm", "microSD"], peso: "1.8 kg" } },
  { keys: ["asus vivobook 15 x512", "vivobook x512", "x512"], specs: { marca: "Asus", modelo: "VivoBook 15 X512", año: 2019, procesador: "Intel Core i5-8265U (4 núcleos, hasta 3.9 GHz)", ram: "8GB DDR4", almacenamiento: "512GB SSD M.2 NVMe", pantalla: '15.6" Full HD (1920x1080) antirreflejo', gpu: "Intel UHD Graphics 620", so_actual: "Windows 10 Home", puertos: ["USB-C 3.1", "USB-A 3.1", "2x USB-A 2.0", "HDMI", "Jack 3.5mm", "microSD"], peso: "1.6 kg" } },
  { keys: ["acer aspire 5 a515", "aspire 5", "a515"], specs: { marca: "Acer", modelo: "Aspire 5 A515-55", año: 2020, procesador: "Intel Core i5-10210U (4 núcleos, hasta 4.2 GHz)", ram: "8GB DDR4", almacenamiento: "512GB SSD M.2 NVMe", pantalla: '15.6" Full HD (1920x1080) antirreflejo', gpu: "Intel UHD Graphics", so_actual: "Windows 10 Home", puertos: ["USB-C 3.2", "3x USB-A", "HDMI", "Jack 3.5mm", "Ethernet"], peso: "1.8 kg" } },
  // ---------- HP G8 / 2021 ----------
  { keys: ["hp elitebook 830 g8", "elitebook 830 g8", "830 g8"], specs: { marca: "HP", modelo: "EliteBook 830 G8", año: 2021, procesador: "Intel Core i5-1135G7 (4 núcleos, hasta 4.2 GHz)", ram: "8GB DDR4 (ampliable)", almacenamiento: "256GB SSD M.2 NVMe", pantalla: '13.3" Full HD (1920x1080) antirreflejo', gpu: "Intel Iris Xe Graphics", so_actual: "Windows 10 Pro", puertos: ["2x Thunderbolt 4 (USB-C)", "2x USB-A", "HDMI", "Jack 3.5mm"], peso: "1.26 kg" } },
  { keys: ["hp elitebook 840 g8", "elitebook 840 g8", "840 g8"], specs: { marca: "HP", modelo: "EliteBook 840 G8", año: 2021, procesador: "Intel Core i5-1135G7 (4 núcleos, hasta 4.2 GHz)", ram: "8GB DDR4 (ampliable a 32GB)", almacenamiento: "256GB SSD M.2 NVMe", pantalla: '14" Full HD (1920x1080) antirreflejo', gpu: "Intel Iris Xe Graphics", so_actual: "Windows 10 Pro", puertos: ["2x Thunderbolt 4 (USB-C)", "2x USB-A", "HDMI", "Jack 3.5mm"], peso: "1.36 kg" } },
  { keys: ["hp elitebook 860 g8", "elitebook 860 g8", "860 g8"], specs: { marca: "HP", modelo: "EliteBook 860 G8", año: 2021, procesador: "Intel Core i5-1135G7 (4 núcleos, hasta 4.2 GHz)", ram: "8GB DDR4 (ampliable)", almacenamiento: "256GB SSD M.2 NVMe", pantalla: '16" Full HD (1920x1080) antirreflejo', gpu: "Intel Iris Xe Graphics", so_actual: "Windows 10 Pro", puertos: ["2x Thunderbolt 4 (USB-C)", "2x USB-A", "HDMI", "Jack 3.5mm"], peso: "1.7 kg" } },
  { keys: ["hp probook 440 g8", "probook 440 g8", "440 g8"], specs: { marca: "HP", modelo: "ProBook 440 G8", año: 2021, procesador: "Intel Core i5-1135G7 (4 núcleos, hasta 4.2 GHz)", ram: "8GB DDR4 (ampliable)", almacenamiento: "256GB SSD M.2 NVMe", pantalla: '14" Full HD (1920x1080) antirreflejo', gpu: "Intel Iris Xe Graphics", so_actual: "Windows 10 Pro", puertos: ["USB-C 3.2", "2x USB-A", "HDMI", "Jack 3.5mm", "Ethernet", "Lector SD"], peso: "1.38 kg" } },
  { keys: ["hp probook 450 g8", "probook 450 g8", "450 g8"], specs: { marca: "HP", modelo: "ProBook 450 G8", año: 2021, procesador: "Intel Core i5-1135G7 (4 núcleos, hasta 4.2 GHz)", ram: "8GB DDR4 (ampliable)", almacenamiento: "256GB SSD M.2 NVMe", pantalla: '15.6" Full HD (1920x1080) antirreflejo', gpu: "Intel Iris Xe Graphics", so_actual: "Windows 10 Pro", puertos: ["USB-C 3.2", "2x USB-A", "HDMI", "Jack 3.5mm", "Ethernet", "Lector SD"], peso: "1.79 kg" } },
  { keys: ["hp probook 470 g8", "probook 470 g8", "470 g8"], specs: { marca: "HP", modelo: "ProBook 470 G8", año: 2021, procesador: "Intel Core i5-1135G7 (4 núcleos, hasta 4.2 GHz)", ram: "8GB DDR4 (ampliable)", almacenamiento: "512GB SSD M.2 NVMe", pantalla: '17.3" Full HD (1920x1080) antirreflejo', gpu: "Intel Iris Xe Graphics", so_actual: "Windows 10 Pro", puertos: ["USB-C 3.2", "2x USB-A", "HDMI", "Jack 3.5mm", "Ethernet", "Lector SD"], peso: "2.05 kg" } },
  { keys: ["hp 250 g8", "250 g8", "hp 250 g8"], specs: { marca: "HP", modelo: "250 G8 15.6", año: 2021, procesador: "Intel Core i5-1135G7 (4 núcleos, hasta 4.2 GHz)", ram: "8GB DDR4 (ampliable)", almacenamiento: "256GB SSD M.2 NVMe", pantalla: '15.6" Full HD (1920x1080) antirreflejo', gpu: "Intel Iris Xe Graphics", so_actual: "Windows 10 Pro", puertos: ["USB-C 3.2", "2x USB-A", "HDMI", "Jack 3.5mm", "Ethernet", "Lector SD"], peso: "1.78 kg" } },
  { keys: ["hp pavilion 15 ec", "pavilion 15 ec", "pavilion ec"], specs: { marca: "HP", modelo: "Pavilion Gaming 15-ec2xxx", año: 2021, procesador: "AMD Ryzen 5 5500U (6 núcleos, hasta 4.0 GHz)", ram: "8GB DDR4", almacenamiento: "512GB SSD M.2 NVMe", pantalla: '15.6" Full HD (1920x1080) antirreflejo', gpu: "AMD Radeon Graphics integrada", so_actual: "Windows 10 Home", puertos: ["USB-C 3.2", "2x USB-A", "HDMI", "Jack 3.5mm", "Lector SD", "Ethernet"], peso: "1.98 kg" } },
  // ---------- Dell / Lenovo 2021-2022 ----------
  { keys: ["dell latitude 5430", "latitude 5430", "5430"], specs: { marca: "Dell", modelo: "Latitude 5430", año: 2022, procesador: "Intel Core i5-1235U (10 núcleos, hasta 4.4 GHz)", ram: "8GB DDR4 (ampliable)", almacenamiento: "256GB SSD M.2 NVMe", pantalla: '14" Full HD (1920x1080) antirreflejo', gpu: "Intel Iris Xe Graphics", so_actual: "Windows 11 Pro", puertos: ["2x Thunderbolt 4 (USB-C)", "2x USB-A 3.2", "HDMI 2.0", "Jack 3.5mm", "Ethernet", "microSD"], peso: "1.36 kg" } },
  { keys: ["dell latitude 5530", "latitude 5530", "5530"], specs: { marca: "Dell", modelo: "Latitude 5530", año: 2022, procesador: "Intel Core i5-1235U (10 núcleos, hasta 4.4 GHz)", ram: "8GB DDR4 (ampliable)", almacenamiento: "256GB SSD M.2 NVMe", pantalla: '15.6" Full HD (1920x1080) antirreflejo', gpu: "Intel Iris Xe Graphics", so_actual: "Windows 11 Pro", puertos: ["2x Thunderbolt 4 (USB-C)", "2x USB-A 3.2", "HDMI 2.0", "Jack 3.5mm", "Ethernet", "microSD"], peso: "1.59 kg" } },
  { keys: ["lenovo thinkpad t14 gen 2", "thinkpad t14 gen 2", "thinkpad t14", "t14 gen 2"], specs: { marca: "Lenovo", modelo: "ThinkPad T14 Gen 2", año: 2021, procesador: "Intel Core i5-1135G7 (4 núcleos, hasta 4.2 GHz)", ram: "8GB DDR4 (ampliable)", almacenamiento: "256GB SSD M.2 NVMe", pantalla: '14" Full HD (1920x1080) antirreflejo', gpu: "Intel Iris Xe Graphics", so_actual: "Windows 10 Pro", puertos: ["2x Thunderbolt 4 (USB-C)", "2x USB-A 3.2", "HDMI", "Jack 3.5mm"], peso: "1.47 kg" } },
  { keys: ["lenovo thinkpad e15 gen 2", "thinkpad e15 gen 2", "thinkpad e15", "e15 gen 2"], specs: { marca: "Lenovo", modelo: "ThinkPad E15 Gen 2", año: 2021, procesador: "Intel Core i5-1135G7 (4 núcleos, hasta 4.2 GHz)", ram: "8GB DDR4 (ampliable)", almacenamiento: "256GB SSD M.2 NVMe", pantalla: '15.6" Full HD (1920x1080) antirreflejo', gpu: "Intel Iris Xe Graphics", so_actual: "Windows 10 Pro", puertos: ["Thunderbolt 4 (USB-C)", "USB-C 3.2", "2x USB-A 3.2", "HDMI", "Jack 3.5mm", "Ethernet"], peso: "1.7 kg" } },
  { keys: ["lenovo v15 g2", "v15 g2", "lenovo v15"], specs: { marca: "Lenovo", modelo: "V15 G2 15.6", año: 2021, procesador: "Intel Core i5-1135G7 (4 núcleos, hasta 4.2 GHz)", ram: "8GB DDR4", almacenamiento: "256GB SSD M.2 NVMe", pantalla: '15.6" Full HD (1920x1080) antirreflejo', gpu: "Intel Iris Xe Graphics", so_actual: "Windows 10 Home", puertos: ["USB-C 3.2", "2x USB-A", "HDMI", "Jack 3.5mm"], peso: "1.7 kg" } },
  { keys: ["asus vivobook 15 x515ea", "vivobook x515ea", "x515ea"], specs: { marca: "Asus", modelo: "VivoBook 15 X515EA", año: 2021, procesador: "Intel Core i5-1135G7 (4 núcleos, hasta 4.2 GHz)", ram: "8GB DDR4", almacenamiento: "512GB SSD M.2 NVMe", pantalla: '15.6" Full HD (1920x1080) antirreflejo', gpu: "Intel Iris Xe Graphics", so_actual: "Windows 10 Home", puertos: ["USB-C 3.2", "USB-A 3.2", "2x USB-A 2.0", "HDMI", "Jack 3.5mm", "microSD"], peso: "1.8 kg" } },
  { keys: ["acer aspire 5 a515-56", "aspire a515-56", "a515-56"], specs: { marca: "Acer", modelo: "Aspire 5 A515-56", año: 2021, procesador: "Intel Core i5-1135G7 (4 núcleos, hasta 4.2 GHz)", ram: "8GB DDR4", almacenamiento: "512GB SSD M.2 NVMe", pantalla: '15.6" Full HD (1920x1080) antirreflejo', gpu: "Intel Iris Xe Graphics", so_actual: "Windows 10 Home", puertos: ["USB-C 3.2", "3x USB-A", "HDMI", "Jack 3.5mm", "Ethernet"], peso: "1.65 kg" } },
];

function norm(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[_+.\-()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokens(s) {
  return norm(s).split(" ").filter((t) => t.length > 1);
}

export function matchSpecs(query) {
  const q = norm(query);
  if (!q) return null;
  const qt = tokens(query);
  // 1) coincidencia exacta de clave
  for (const item of DB) {
    if (item.keys.some((k) => norm(k) === q)) return { specs: item.specs, exact: true };
  }
  // 2) la clave está contenida en la consulta o viceversa
  for (const item of DB) {
    if (item.keys.some((k) => { const nk = norm(k); return nk && (q.includes(nk) || nk.includes(q)); })) return { specs: item.specs, exact: true };
  }
  // 3) mejor puntaje por tokens (aproximado: exige verificación manual)
  let best = null, bestScore = 0;
  for (const item of DB) {
    for (const k of item.keys) {
      const kt = tokens(k);
      const common = kt.filter((t) => qt.includes(t));
      const longHit = common.some((t) => t.length >= 4);
      const score = common.length * 2 + (longHit ? 2 : 0) + (common.length === kt.length && kt.length ? 1 : 0);
      if ((common.length >= 2 || (common.length === 1 && longHit)) && score > bestScore) {
        bestScore = score; best = item.specs;
      }
    }
  }
  return best ? { specs: best, exact: false } : null;
}

export function findSpecs(query) {
  const m = matchSpecs(query);
  return m ? m.specs : null;
}

// Sugerencias: los N modelos con mayor traslape de tokens (para el "¿quisiste decir…?")
export function suggestSpecs(query, n) {
  n = n || 3;
  const qt = tokens(query);
  if (!qt.length) return [];
  const scored = DB.map((item) => {
    let score = 0;
    for (const k of item.keys) {
      const kt = tokens(k);
      const common = kt.filter((t) => qt.includes(t));
      score = Math.max(score, common.length * 2 + (common.some((t) => t.length >= 4) ? 1 : 0));
    }
    return { modelo: item.specs.marca + ' ' + item.specs.modelo, score };
  }).filter((s) => s.score > 0);
  scored.sort((a, b) => b.score - a.score);
  const seen = new Set();
  const out = [];
  for (const s of scored) {
    if (!seen.has(s.modelo)) { seen.add(s.modelo); out.push(s.modelo); }
    if (out.length >= n) break;
  }
  return out;
}

export async function handler(event) {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Cache-Control": "public, max-age=3600",
  };
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers, body: "" };
  const model = ((event.queryStringParameters || {}).model || "").trim();
  if (!model) {
    return { statusCode: 400, headers, body: JSON.stringify({ found: false, error: "Falta parámetro ?model=MARCA_Y_MODELO" }) };
  }
  const m = matchSpecs(model);
  if (!m) {
    return { statusCode: 404, headers, body: JSON.stringify({ found: false, query: model, suggestions: suggestSpecs(model, 3), error: "Modelo no encontrado en la base. Prueba una sugerencia o completa los campos manualmente." }) };
  }
  const specs = m.specs;
  const body = { found: true, query: model, specs };
  if (!m.exact) {
    body.approximate = true;
    body.note = "Coincidencia aproximada: verifica año y procesador antes de publicar.";
  }
  return { statusCode: 200, headers, body: JSON.stringify(body) };
}
