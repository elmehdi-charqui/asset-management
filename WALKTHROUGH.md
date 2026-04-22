# 📝 Walkthrough - OCP Asset Management

## Introduction
Ce document résume les fonctionnalités implémentées dans cette version de la plateforme de gestion d'actifs OCP.

## 🔐 Accès par défaut
Voici les identifiants pour tester l'application après avoir lancé le seeder (`php artisan migrate --seed`) :

| Rôle | Email | Mot de passe |
|------|-------|--------------|
| **Administrateur** | `admin@ocp.ma` | `password` |
| **Technicien** | `tech@ocp.ma` | `password` |

## 🌟 Fonctionnalités Clés

### 1. Rapports & Analyses
- **Tableau de bord interactif** : Visualisation de la valeur totale du parc, des coûts de maintenance et des alertes de licences.
- **Export PDF** : Système prêt pour l'exportation de l'inventaire complet.
- **Fiches de performance** : Suivi en temps réel des indicateurs clés (KPI).

### 2. Cycle de vie (Audit Log)
- **Timeline interactive** : Historique complet de toutes les actions effectuées sur le système (création d'équipement, modifications, etc.).
- **Détails techniques** : Affichage des adresses IP, des utilisateurs responsables et des types d'événements.

### 3. Maintenance & Interventions
- **Planification** : Nouveau formulaire pour planifier les interventions futures.
- **Suivi des statuts** : Gestion des états (Planifiée, En cours, Terminée).
- **Calcul des coûts** : Suivi budgétaire par intervention.

### 4. Gestion des Licences
- **Inventaire logiciel** : Suivi des clés de licence, éditeurs et dates d'expiration.
- **Alertes critiques** : Notification visuelle pour les licences arrivant à expiration.

### 5. Expérience Utilisateur (UX)
- **Mode Sombre / Clair** : Toggle dynamique pour changer de thème selon la préférence de l'utilisateur.
- **Notifications** : Menu déroulant interactif pour les alertes système.
- **Design Premium** : Utilisation de Framer Motion pour les animations et Tailwind CSS pour un design "industrial-grade".

## 🚀 Prochaines Étapes suggérées
- Mise en place du système d'exportation PDF réel via DomPDF.
- Intégration de QR Codes pour l'inventaire physique.
- Gestion des stocks de pièces détachées.
