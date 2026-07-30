# Feature: Mission Control

- **Owner:** Platform & Core Operations Team
- **Purpose:** Primary mission control dashboard providing system status, proactive timelines, and quick actions.
- **Routes:** `/dashboard/overview`
- **Permissions:** `DEVICES:READ`, `CONTENT:READ`, `ANALYTICS:READ`
- **Repositories Owned:** None (Consumes domain widgets and data repositories)
- **Widgets Exposed:** FleetHealthWidget, StorageWidget, ActiveDeploymentsWidget
- **Domain Events:** Consumes `DeviceRestarted`, `PlaylistPublished`, `CampaignCreated`
- **Future Backend APIs:** `/api/v1/mission-control/summary`
