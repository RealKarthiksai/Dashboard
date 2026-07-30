import { NAVIGATION_REGISTRY } from '../src/core/navigation/navigation.registry';
import { QUICK_ACTIONS_REGISTRY } from '../src/features/mission-control/widgets/quick-actions.registry';
import { NOTIFICATION_REGISTRY } from '../src/core/notifications/notification.registry';
import { MISSION_CONTROL_WIDGETS } from '../src/features/mission-control/widgets/widget.registry';
import { Permission } from '../src/core/authorization/permissions';

let hasError = false;
const allPermissions = new Set(Object.values(Permission).flatMap((group) => Object.values(group)));

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    hasError = true;
  }
}

function checkDuplicateIds(items: { id: string }[], name: string) {
  const ids = new Set<string>();
  items.forEach((item) => {
    assert(!ids.has(item.id), `[${name}] Duplicate ID found: ${item.id}`);
    ids.add(item.id);
  });
}

function checkPermission(permission: string | undefined, context: string) {
  if (permission) {
    assert(allPermissions.has(permission as any), `${context}: Invalid permission reference '${permission}'`);
  }
}

// 1. Navigation Registry
console.log('Validating NAVIGATION_REGISTRY...');
checkDuplicateIds(NAVIGATION_REGISTRY, 'Navigation');
const navRoutes = new Set<string>();
NAVIGATION_REGISTRY.forEach((nav) => {
  assert(!!nav.title, `[Navigation] ${nav.id} missing title`);
  assert(!!nav.icon, `[Navigation] ${nav.id} missing icon`);
  assert(!!nav.route && nav.route.startsWith('/'), `[Navigation] ${nav.id} has invalid route: ${nav.route}`);
  assert(!navRoutes.has(nav.route), `[Navigation] Duplicate route found: ${nav.route}`);
  navRoutes.add(nav.route);
  checkPermission(nav.requiredPermission, `[Navigation ${nav.id}]`);
});

// 2. Widget Registry
console.log('Validating MISSION_CONTROL_WIDGETS...');
checkDuplicateIds(MISSION_CONTROL_WIDGETS, 'Widgets');
MISSION_CONTROL_WIDGETS.forEach((widget) => {
  assert(typeof widget.render === 'function', `[Widgets] ${widget.id} missing render component`);
  assert(!!widget.permission, `[Widgets] ${widget.id} missing permission`);
  checkPermission(widget.permission, `[Widgets ${widget.id}]`);
  assert(['small', 'medium', 'large'].includes(widget.size), `[Widgets] ${widget.id} invalid size`);
  assert(typeof widget.priority === 'number', `[Widgets] ${widget.id} missing priority`);
});

// 3. Quick Actions
console.log('Validating QUICK_ACTIONS_REGISTRY...');
checkDuplicateIds(QUICK_ACTIONS_REGISTRY, 'QuickActions');
QUICK_ACTIONS_REGISTRY.forEach((action) => {
  assert(!!action.label, `[QuickActions] ${action.id} missing label`);
  assert(!!action.icon, `[QuickActions] ${action.id} missing icon`);
  assert(!!action.path, `[QuickActions] ${action.id} missing path`);
  checkPermission(action.permission, `[QuickActions ${action.id}]`);
});

// 4. Notifications
console.log('Validating NOTIFICATION_REGISTRY...');
checkDuplicateIds(NOTIFICATION_REGISTRY, 'Notifications');
NOTIFICATION_REGISTRY.forEach((notif) => {
  assert(!!notif.title, `[Notifications] ${notif.id} missing title`);
  assert(
    ['Operations', 'Content', 'Campaigns', 'Billing'].includes(notif.category),
    `[Notifications] ${notif.id} invalid category`
  );
  assert(
    ['high', 'medium', 'low'].includes(notif.priority),
    `[Notifications] ${notif.id} invalid priority`
  );
  checkPermission(notif.permission, `[Notifications ${notif.id}]`);
});

if (hasError) {
  console.error('\n💥 Registry validation FAILED.');
  process.exit(1);
} else {
  console.log('\n✅ All registries validated successfully!');
}
