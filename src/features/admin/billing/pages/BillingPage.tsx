import React, { useEffect, useState } from 'react';
import { adminRepository } from '../../repositories/AdminRepository';
import type { BillingDetails, Invoice } from '../../data/types';
import { PermissionGate } from '@/shared/components/PermissionGate';
import { Permission } from '@/core/authorization/permissions';
import { DataTable, type Column } from '@/shared/components/data-display/DataTable';
import { CreditCard, Download, Zap, CheckCircle2, Shield } from 'lucide-react';

export const BillingPage: React.FC = () => {
  const [billing, setBilling] = useState<BillingDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBilling = async () => {
      setLoading(true);
      const data = await adminRepository.getBilling();
      setBilling(data);
      setLoading(false);
    };
    fetchBilling();
  }, []);

  const invoiceColumns: Column<Invoice>[] = [
    {
      header: 'Invoice Number',
      cell: (inv: Invoice) => (
        <span className="font-mono font-semibold text-xs text-[var(--color-text-primary)]">
          {inv.number}
        </span>
      ),
    },
    {
      header: 'Billing Date',
      cell: (inv: Invoice) =>
        new Date(inv.date).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
    },
    {
      header: 'Amount Paid',
      cell: (inv: Invoice) => (
        <span className="font-semibold text-xs text-[var(--color-text-primary)]">
          ${inv.amount.toLocaleString()} {inv.currency}
        </span>
      ),
    },
    {
      header: 'Status',
      cell: (inv: Invoice) => (
        <span className="capitalize px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
          {inv.status}
        </span>
      ),
    },
    {
      header: 'Receipt',
      cell: (inv: Invoice) => (
        <button
          onClick={() => alert(`Downloading PDF invoice: ${inv.number}`)}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-surface-hover)] text-[var(--color-text-primary)] transition-colors"
        >
          <Download className="w-3.5 h-3.5 text-[var(--color-primary)]" />
          Download PDF
        </button>
      ),
    },
  ];

  return (
    <PermissionGate required={Permission.BILLING.READ}>
      <div className="p-6 max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Subscription & Billing</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            Manage enterprise subscription plan, screen license limits, payment methods, and invoice history.
          </p>
        </div>

        {loading || !billing ? (
          <div className="h-64 flex items-center justify-center text-[var(--color-text-muted)]">
            Loading billing information...
          </div>
        ) : (
          <>
            {/* Top Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Plan Tier */}
              <div className="bg-[var(--color-surface)] p-6 rounded-xl border border-[var(--color-border)] space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-[var(--color-text-muted)] uppercase">
                  <span>Active Tier</span>
                  <Zap className="w-4 h-4 text-amber-500" />
                </div>
                <div className="text-xl font-extrabold text-[var(--color-text-primary)]">
                  {billing.subscriptionPlan}
                </div>
                <div className="text-xs text-[var(--color-text-muted)]">
                  ${billing.planPriceMonthly}/month • Billed {billing.billingCycle}
                </div>
                <PermissionGate required={Permission.BILLING.UPDATE}>
                  <button
                    onClick={() => alert('Change plan tier dialog')}
                    className="w-full mt-2 py-1.5 px-3 bg-[var(--color-surface-hover)] border border-[var(--color-border)] rounded-lg text-xs font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-border)] transition-colors"
                  >
                    Upgrade or Modify Plan
                  </button>
                </PermissionGate>
              </div>

              {/* Screen License Usage */}
              <div className="bg-[var(--color-surface)] p-6 rounded-xl border border-[var(--color-border)] space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-[var(--color-text-muted)] uppercase">
                  <span>Device License Usage</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="text-xl font-extrabold text-[var(--color-text-primary)]">
                  {billing.deviceLicensesUsed} / {billing.deviceLicensesAllocated} Screens
                </div>
                <div className="w-full bg-[var(--color-background)] rounded-full h-2 overflow-hidden border border-[var(--color-border)]">
                  <div
                    className="bg-[var(--color-primary)] h-full transition-all"
                    style={{
                      width: `${(billing.deviceLicensesUsed / billing.deviceLicensesAllocated) * 100}%`,
                    }}
                  />
                </div>
                <div className="text-xs text-[var(--color-text-muted)]">
                  {billing.deviceLicensesAllocated - billing.deviceLicensesUsed} screen slots available
                </div>
              </div>

              {/* Payment Method (Stripe Mocked) */}
              <div className="bg-[var(--color-surface)] p-6 rounded-xl border border-[var(--color-border)] space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-[var(--color-text-muted)] uppercase">
                  <span>Payment Method</span>
                  <CreditCard className="w-4 h-4 text-blue-500" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-[var(--color-primary-light)] text-[var(--color-primary)] font-bold text-xs border border-[var(--color-primary)]/20">
                    {billing.paymentMethod.brand}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[var(--color-text-primary)]">
                      •••• {billing.paymentMethod.last4}
                    </div>
                    <div className="text-xs text-[var(--color-text-muted)]">
                      Expires {billing.paymentMethod.expMonth}/{billing.paymentMethod.expYear}
                    </div>
                  </div>
                </div>
                <PermissionGate required={Permission.BILLING.UPDATE}>
                  <button
                    onClick={() => alert('Update payment method modal (Stripe integration mock)')}
                    className="w-full mt-2 py-1.5 px-3 bg-[var(--color-surface-hover)] border border-[var(--color-border)] rounded-lg text-xs font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-border)] transition-colors"
                  >
                    Update Card
                  </button>
                </PermissionGate>
              </div>
            </div>

            {/* Invoices History Table */}
            <div className="bg-[var(--color-surface)] p-6 rounded-xl border border-[var(--color-border)] space-y-4">
              <h2 className="text-base font-semibold text-[var(--color-text-primary)] flex items-center gap-2">
                <Shield className="w-4 h-4 text-[var(--color-primary)]" />
                Paid Invoices & Transaction Log
              </h2>
              <DataTable data={billing.invoices} columns={invoiceColumns} keyExtractor={(i) => i.id} />
            </div>
          </>
        )}
      </div>
    </PermissionGate>
  );
};
