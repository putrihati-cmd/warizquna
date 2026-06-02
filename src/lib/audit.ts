import { getDb } from "./db";

export type AuditEntry = {
  user_id: number;
  api_key_id?: number | null;
  action: string;
  target?: string | null;
  status: "ok" | "fail";
  message?: string | null;
};

export type AuditRow = AuditEntry & {
  id: number;
  created_at: string;
};

/**
 * Synchronously insert an audit event. Best-effort — errors are swallowed.
 */
export function auditLog(entry: AuditEntry) {
  try {
    const db = getDb();
    db.prepare(
      `INSERT INTO audit_logs (user_id, api_key_id, action, target, status, message)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).run(
      entry.user_id,
      entry.api_key_id ?? null,
      entry.action,
      entry.target ?? null,
      entry.status,
      entry.message ?? null
    );
  } catch (e) {
    console.error("[audit] insert failed:", e instanceof Error ? e.message : e);
  }
}

export function listAuditLogs(userId: number, limit = 50): AuditRow[] {
  const db = getDb();
  return db
    .prepare<{ uid: number; lim: number }, AuditRow>(
      `SELECT * FROM audit_logs WHERE user_id = @uid ORDER BY id DESC LIMIT @lim`
    )
    .all({ uid: userId, lim: limit });
}