-- SQL dump generated using DBML (dbml.dbdiagram.io)
-- Database: MySQL
-- Generated at: 2025-05-29T03:14:15.254Z

CREATE TABLE `usuarios` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(255),
  `email` varchar(255) UNIQUE,
  `password_hash` varchar(255),
  `rol` varchar(255),
  `activo` boolean
);

CREATE TABLE `docentes` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(255),
  `rut` varchar(255),
  `email` varchar(255),
  `estado` varchar(255)
);

CREATE TABLE `planes_estudio` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(255),
  `codigo` varchar(255),
  `fecha_inicio` date,
  `fecha_fin` date,
  `estado` varchar(255)
);

CREATE TABLE `asignaturas` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(255),
  `codigo` varchar(255),
  `nivel` int,
  `plan_estudios_id` int
);

CREATE TABLE `eventos` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(255),
  `fecha` date,
  `hora_inicio` time,
  `hora_fin` time,
  `asignatura_id` int,
  `plan_estudios_id` int,
  `vacantes` int,
  `nivel` int
);

CREATE TABLE `asignaciones` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `evento_id` int,
  `docente_id` int,
  `horas_asignadas` int
);

CREATE TABLE `archivos_insumo` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `tipo` varchar(255),
  `nombre_archivo` varchar(255),
  `fecha_carga` date,
  `usuario_id` int
);

ALTER TABLE `asignaturas` ADD FOREIGN KEY (`plan_estudios_id`) REFERENCES `planes_estudio` (`id`);

ALTER TABLE `eventos` ADD FOREIGN KEY (`asignatura_id`) REFERENCES `asignaturas` (`id`);

ALTER TABLE `eventos` ADD FOREIGN KEY (`plan_estudios_id`) REFERENCES `planes_estudio` (`id`);

ALTER TABLE `asignaciones` ADD FOREIGN KEY (`evento_id`) REFERENCES `eventos` (`id`);

ALTER TABLE `asignaciones` ADD FOREIGN KEY (`docente_id`) REFERENCES `docentes` (`id`);

ALTER TABLE `archivos_insumo` ADD FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);
