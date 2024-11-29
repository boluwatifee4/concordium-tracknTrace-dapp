/**
 * Converts microCCD to CCD.
 * @param microCcdAmount - The amount in microCCD as a bigint.
 * @returns The equivalent amount in CCD as a number.
 */
export function microCcdToCcd(microCcdAmount: bigint): number {
    const MICRO_CCD_PER_CCD = 1_000_000n;
    return Number(microCcdAmount) / Number(MICRO_CCD_PER_CCD);
}


/**
 * Converts CCD to microCCD.
 * @param ccdAmount - The amount in CCD as a number.
 * @returns The equivalent amount in microCCD as a bigint.
 */
export function ccdToMicroCcd(ccdAmount: number): bigint {
    const MICRO_CCD_PER_CCD = 1_000_000n;
    return BigInt(Math.round(ccdAmount * Number(MICRO_CCD_PER_CCD)));
}
