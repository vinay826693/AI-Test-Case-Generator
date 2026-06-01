export function getBlockingViolations(
    violations: any[]
) {
    return violations.filter(
        violation =>
            violation.impact === 'critical' ||
            violation.impact === 'serious'
    );
}