/**
 * Calibration — Brier-score forecast calibration tracking.
 *
 * Users make probabilistic predictions about scenario outcomes.
 * After resolution, Brier scores are computed: lower = better calibrated.
 * Deterministic — no external data needed.
 */

export interface CalibrationRecord {
  id: string;
  userId: string;
  forecastId: string;
  predictedProbability: number; // 0..1
  actualOutcome: boolean; // what actually happened
  brierScore: number; // (p - o)^2
  resolvedAt: number; // year
}

export interface BrierResult {
  meanBrierScore: number;
  calibrationCurve: { bin: number; forecastCount: number; observedFrequency: number }[];
  resolution: number; // how well forecasts separate outcomes
  uncertainty: number; // inherent outcome uncertainty
}

export function calibration() {
  const records: CalibrationRecord[] = [];

  function recordForecast(
    id: string,
    userId: string,
    forecastId: string,
    predictedProbability: number,
    actualOutcome: boolean,
    resolvedAt: number,
  ): CalibrationRecord {
    const brierScore = (predictedProbability - (actualOutcome ? 1 : 0)) ** 2;
    const record: CalibrationRecord = {
      id,
      userId,
      forecastId,
      predictedProbability,
      actualOutcome,
      brierScore,
      resolvedAt,
    };
    records.push(record);
    return record;
  }

  function brierResult(): BrierResult {
    if (records.length === 0) {
      return {
        meanBrierScore: 0,
        calibrationCurve: [],
        resolution: 0,
        uncertainty: 0,
      };
    }

    const meanBrierScore = records.reduce((sum, r) => sum + r.brierScore, 0) / records.length;

    // 10-bin calibration curve
    const calibrationCurve: { bin: number; forecastCount: number; observedFrequency: number }[] =
      [];
    for (let bin = 0; bin < 10; bin++) {
      const binRecords = records.filter((r) => Math.floor(r.predictedProbability * 10) === bin);
      if (binRecords.length === 0) continue;
      const observedFrequency =
        binRecords.filter((r) => r.actualOutcome).length / binRecords.length;
      calibrationCurve.push({
        bin,
        forecastCount: binRecords.length,
        observedFrequency,
      });
    }

    // Resolution = variance of observed frequencies across bins
    const overallFreq = records.filter((r) => r.actualOutcome).length / records.length;
    const resolution =
      calibrationCurve.reduce(
        (sum, c) => sum + c.forecastCount * (c.observedFrequency - overallFreq) ** 2,
        0,
      ) / records.length;

    // Uncertainty = overallFreq * (1 - overallFreq)
    const uncertainty = overallFreq * (1 - overallFreq);

    return { meanBrierScore, calibrationCurve, resolution, uncertainty };
  }

  return { recordForecast, brierResult, records };
}
