/*
 * Tests for the checkMask method of NumberComponent class
 * NumberComponent.checkMask(undefined) === -1
 * NumberComponent.checkMask(null) === -1
 * NumberComponent.checkMask('') === -1
 * NumberComponent.checkMask(1) === -1
 * NumberComponent.checkMask(1.0) === -1
 * NumberComponent.checkMask('+7(985)9II-**-XX') === ['+', '7', '(', '9', '8', '5', ')', '9', 'I', 'I', '-', '*', '*', '-', 'X', 'X']
 * NumberComponent.checkMask('+7(985)9II-**-Xa') === -1
 */

 import { NumberComponent } from '../NumberComponent'

 test('Returns -1 for incorrect mask', () => {
    expect(NumberComponent.checkMask(undefined)).toBe(-1)
    expect(NumberComponent.checkMask(null)).toBe(-1)
    expect(NumberComponent.checkMask('')).toBe(-1)
    expect(NumberComponent.checkMask(1)).toBe(-1)
    expect(NumberComponent.checkMask(1.0)).toBe(-1)
    expect(NumberComponent.checkMask('+7(985)9II-**-Xa')).toBe(-1)
 })

 test('Returns list for correct data', () => {
    expect(NumberComponent.checkMask('+7(985)9II-**-XX')).toStrictEqual(['+', '7', '(', '9', '8', '5', ')', '9', 'I', 'I', '-', '*', '*', '-', 'X', 'X'])
 })