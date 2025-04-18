# PR: MVP Scaffolding + Story Tracker (PB001–PB055)

---

## 📋 Table of Contents
1. [Description](#description)  
2. [Assignments](#assignments)  
3. [Story Breakdown & Owners](#story-breakdown--owners)  
   - [Authentication & User Management](#authentication--user-management)  
   - [Super‑Admin](#super-admin)  
   - [Admin (Back‑office)](#admin-back-office)  
   - [Real‑Estate Agent](#real-estate-agent)  
   - [Investor (Mobile)](#investor-mobile)  
   - [AI / Machine Learning](#ai--machine-learning)  
   - [Blockchain & Smart Contracts](#blockchain--smart-contracts)  
   - [System & Security](#system--security)  
   - [DevOps & Infrastructure](#devops--infrastructure)  
   - [Mobile‑Specific UX](#mobile-specific-ux)  
4. [Definition of Done](#definition-of-done)  
5. [Deployment Notes](#deployment-notes)  
6. [CC](#cc)  

---

## Description
> This PR lays the initial skeleton for every backlog item so each domain owner can start pushing code against a single, visible list.

---

## Assignments
| Area                       | Owners                               |
|----------------------------|--------------------------------------|
| **Mobile (Investor)**      | @kr, @gh                             |
| **Back‑office / Back‑end** | @ahmed‑jaziri, @Assil‑Khaldi         |
| **AI / ML services**       | @Wael‑mbarki                         |
| **Blockchain layer**       | @Assil‑Khaldi                        |
| **DevOps & Infrastructure**| @ahmed‑jaziri, @Assil‑Khaldi         |

---

## Story Breakdown & Owners

### Authentication & User Management
| Done   | ID     | Story                          | Owner            |
| ------ | ------ | ------------------------------ | ---------------- |
| [ ]    | PB001  | Create account & secure auth   | @ahmed‑jaziri    |
| [ ]    | PB002  | Profile management             | @ahmed‑jaziri    |
| [ ]    | PB003  | Secure logout                  | @ahmed‑jaziri    |
| [ ]    | PB004  | Multi‑company admin management | @ahmed‑jaziri    |

### Super‑Admin
| Done   | ID     | Story                             | Owner                       |
| ------ | ------ | --------------------------------- | --------------------------- |
| [ ]    | PB005  | Security / compliance dashboard   | @ahmed‑jaziri               |
| [ ]    | PB006  | Global configuration panel        | @ahmed‑jaziri               |
| [ ]    | PB007  | Analytics & reports               | @ahmed‑jaziri               |
| [ ]    | PB008  | Content moderation                | *Won’t do*                  |
| [ ]    | PB009  | Secure AI assistant access        | @ahmed‑jaziri, @Wael‑mbarki |

### Admin (Back‑office)
| Done   | ID     | Story                         | Owner                              |
| ------ | ------ | ----------------------------- | ---------------------------------- |
| [ ]    | PB010  | Listing management            | @ahmed‑jaziri, @Assil‑Khaldi       |
| [ ]    | PB011  | Agent permissions             | @ahmed‑jaziri, @Assil‑Khaldi       |
| [ ]    | PB012  | Transactions & commissions    | @ahmed‑jaziri, @Assil‑Khaldi       |
| [ ]    | PB013  | Investor support inbox        | @ahmed‑jaziri, @Assil‑Khaldi       |
| [ ]    | PB014  | Agency analytics dashboard    | @ahmed‑jaziri, @Assil‑Khaldi       |
| [ ]    | PB015  | AI‑powered valuation          | @Wael‑mbarki                       |

### Real‑Estate Agent
| Done   | ID     | Story                    | Owner         |
| ------ | ------ | ------------------------ | ------------- |
| [ ]    | PB016  | Create/manage listings   | @ahmed‑jaziri |
| [ ]    | PB017  | Investments & purchases  | @ahmed‑jaziri |
| [ ]    | PB018  | Data for AI              | @Wael‑mbarki  |
| [ ]    | PB019  | Client CRM               | @ahmed‑jaziri |
| [ ]    | PB020  | View commissions         | @ahmed‑jaziri |

### Investor (Mobile)
| Done   | ID     | Story                             | Owner                |
| ------ | ------ | --------------------------------- | -------------------- |
| [ ]    | PB021  | Browse listings                   | @kr, @gh             |
| [ ]    | PB022  | Advanced search / filters         | @kr, @gh             |
| [ ]    | PB023  | Simple invest flow                | @kr, @gh             |
| [ ]    | PB024  | Real‑time portfolio               | @kr, @gh             |
| [ ]    | PB025  | Secure payments                   | @kr, @gh             |
| [ ]    | PB026  | AI property recommendations       | @Wael‑mbarki, @kr, @gh |
| [ ]    | PB027  | AI legal Q&A                      | @Wael‑mbarki, @kr, @gh |
| [ ]    | PB028  | Earnings prediction               | @Wael‑mbarki, @kr, @gh |
| [ ]    | PB029  | Manage earnings & withdrawals     | @kr, @gh             |

### AI / Machine Learning
| Done   | ID     | Story                         | Owner         |
| ------ | ------ | ----------------------------- | ------------- |
| [ ]    | PB030  | Personalized recommender      | @Wael‑mbarki  |
| [ ]    | PB031  | Valuation & rent predictor    | @Wael‑mbarki  |
| [ ]    | PB032  | Investment forecasting        | @Wael‑mbarki  |
| [ ]    | PB033  | NLP legal info                | @Wael‑mbarki  |
| [ ]    | PB034  | Secure AI DB access           | @Wael‑mbarki  |

### Blockchain & Smart Contracts
| Done   | ID     | Story                         | Owner               |
| ------ | ------ | ----------------------------- | ------------------- |
| [ ]    | PB035  | Virtual contracts             | @Assil‑Khaldi       |
| [ ]    | PB036  | Investor asset security       | @Assil‑Khaldi       |
| [ ]    | PB037  | Admin transaction verify      | @Assil‑Khaldi       |
| [ ]    | PB038  | Immutable records             | @Assil‑Khaldi       |
| [ ]    | PB039  | Chain health monitoring       | @Assil‑Khaldi       |

### System & Security
| Done   | ID     | Story                            | Owner                       |
| ------ | ------ | -------------------------------- | --------------------------- |
| [ ]    | PB040  | Automated auth/session manager   | @ahmed‑jaziri               |
| [ ]    | PB041  | Real‑time notifications          | @ahmed‑jaziri               |
| [ ]    | PB042  | Transaction consistency          | @ahmed‑jaziri               |
| [ ]    | PB043  | Secure AI↔DB comms               | @ahmed‑jaziri, @Wael‑mbarki |

### DevOps & Infrastructure
| Done   | ID     | Story                            | Owner                            |
| ------ | ------ | -------------------------------- | -------------------------------- |
| [ ]    | PB044  | CI/CD                            | @ahmed‑jaziri, @Assil‑Khaldi     |
| [ ]    | PB045  | Deploy images to GCP registry    | @ahmed‑jaziri, @Assil‑Khaldi     |
| [ ]    | PB046  | Auto‑deploy back‑end & DB        | @ahmed‑jaziri, @Assil‑Khaldi     |
| [ ]    | PB047  | Dockerize components             | @ahmed‑jaziri, @Assil‑Khaldi     |
| [ ]    | PB048  | Auto‑deploy web frontend         | @ahmed‑jaziri, @Assil‑Khaldi     |
| [ ]    | PB049  | Auto‑deploy mobile app           | @ahmed‑jaziri, @Assil‑Khaldi     |
| [ ]    | PB050  | Mobile versioning                | @ahmed‑jaziri, @Assil‑Khaldi     |
| [ ]    | PB051  | System health monitoring         | @ahmed‑jaziri, @Assil‑Khaldi     |
| [ ]    | PB052  | Env configuration manager        | @ahmed‑jaziri, @Assil‑Khaldi     |

### Mobile‑Specific UX
| Done   | ID     | Story                            | Owner     |
| ------ | ------ | -------------------------------- | --------- |
| [ ]    | PB053  | Responsive intuitive UI          | @kr, @gh  |
| [ ]    | PB054  | Push notifications               | @kr, @gh  |
| [ ]    | PB055  | Offline portfolio access         | @kr, @gh  |

---

## ✅ Definition of Done
- [ ] All subtasks & tests pass in CI  
- [ ] Security, lint, and coverage checks green  
- [ ] Docs (OpenAPI, README) updated  
- [ ] Commit body references PB ID and the checklist above is ticked  

---

## 🚀 Deployment Notes
Merging to **main** triggers full CI/CD (PB044–PB050) and auto‑posts canary URLs.

---

## 📣 CC
@ahmed‑jaziri  @Assil‑Khaldi  @Wael‑mbarki  @kr  @gh
