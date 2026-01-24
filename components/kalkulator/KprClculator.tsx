'use client'

import { useState, useMemo } from 'react'
import {
  formatRupiah,
  formatNumber,
  parseNumber,
} from '@/libs/format'

type MonthlyRow = {
  month: number
  year: number
  phase: 'Fixed' | 'Floating'
  installment: number
  interest: number
  principal: number
  remainingLoan: number
}

type YearlyRow = {
  year: number
  phase: 'Fixed' | 'Floating'
  monthlyInstallment: number
  yearlyPayment: number
  yearlyInterest: number
  remainingLoan: number
}

export default function KprCalculator() {
  const [priceInput, setPriceInput] = useState('')
  const [dpPercent, setDpPercent] = useState(20)
  const [tenorYear, setTenorYear] = useState(20)
  const [fixedRate, setFixedRate] = useState(5)
  const [fixedYear, setFixedYear] = useState(3)
  const [floatingRate, setFloatingRate] = useState(10)

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const price = parseNumber(priceInput) || 0

  const dpNominal = useMemo(() => {
    if (!price || dpPercent <= 0) return 0
    return (dpPercent / 100) * price
  }, [price, dpPercent])

  const calculate = () => {
    if (!price) return

    setLoading(true)
    setResult(null)

    setTimeout(() => {
      const loan = price - dpNominal
      const totalMonth = tenorYear * 12
      const fixedMonth = fixedYear * 12

      const fixedMonthlyRate = fixedRate / 100 / 12
      const floatingMonthlyRate =
        floatingRate / 100 / 12

      const monthlyRows: MonthlyRow[] = []
      let remainingLoan = loan

      // ===== FIXED INSTALLMENT (ANUITAS) =====
      const fixedInstallment =
        (loan * fixedMonthlyRate) /
        (1 -
          Math.pow(
            1 + fixedMonthlyRate,
            -totalMonth
          ))

      let floatingInstallment = 0

      for (let m = 1; m <= totalMonth; m++) {
        const year = Math.ceil(m / 12)
        const phase =
          m <= fixedMonth ? 'Fixed' : 'Floating'

        const rate =
          phase === 'Fixed'
            ? fixedMonthlyRate
            : floatingMonthlyRate

        if (
          phase === 'Floating' &&
          floatingInstallment === 0
        ) {
          const remainingMonth =
            totalMonth - (m - 1)

          floatingInstallment =
            (remainingLoan *
              floatingMonthlyRate) /
            (1 -
              Math.pow(
                1 + floatingMonthlyRate,
                -remainingMonth
              ))
        }

        const installment =
          phase === 'Fixed'
            ? fixedInstallment
            : floatingInstallment

        const interest = remainingLoan * rate
        const principal = installment - interest
        remainingLoan -= principal

        monthlyRows.push({
          month: m,
          year,
          phase,
          installment,
          interest,
          principal,
          remainingLoan:
            remainingLoan < 0 ? 0 : remainingLoan,
        })
      }

      // ===== AGGREGATE YEARLY =====
      const yearlyMap = new Map<number, YearlyRow>()

      monthlyRows.forEach((row) => {
        if (!yearlyMap.has(row.year)) {
          yearlyMap.set(row.year, {
            year: row.year,
            phase: row.phase,
            monthlyInstallment: Math.round(
              row.installment
            ),
            yearlyPayment: 0,
            yearlyInterest: 0,
            remainingLoan: 0,
          })
        }

        const y = yearlyMap.get(row.year)!
        y.yearlyPayment += row.installment
        y.yearlyInterest += row.interest
        y.remainingLoan = row.remainingLoan
      })

      const yearlySchedule = Array.from(
        yearlyMap.values()
      ).map((y) => ({
        ...y,
        yearlyPayment: Math.round(y.yearlyPayment),
        yearlyInterest: Math.round(y.yearlyInterest),
        remainingLoan: Math.round(y.remainingLoan),
      }))

      const fixedRows = monthlyRows.filter(
        (r) => r.phase === 'Fixed'
      )
      const floatingRows = monthlyRows.filter(
        (r) => r.phase === 'Floating'
      )

      setResult({
        price,
        dp: dpNominal,
        loan,

        fixed: {
          rate: fixedRate,
          year: fixedYear,
          month: fixedMonth,
          installment: Math.round(
            fixedInstallment
          ),
          totalInterest: Math.round(
            fixedRows.reduce(
              (a, b) => a + b.interest,
              0
            )
          ),
          totalPayment: Math.round(
            fixedRows.reduce(
              (a, b) => a + b.installment,
              0
            )
          ),
        },

        floating: {
          rate: floatingRate,
          remainingLoan: Math.round(
            fixedRows[fixedRows.length - 1]
              ?.remainingLoan || loan
          ),
          remainingMonth:
            totalMonth - fixedMonth,
          installment: Math.round(
            floatingInstallment
          ),
        },

        yearlySchedule,
      })

      setLoading(false)
    }, 600)
  }

  return (
    <div className="space-y-4">
      {/* INPUTS */}
      <div>
        <label className="block text-sm font-medium">
          Harga Rumah
        </label>
        <input
          type="text"
          inputMode="numeric"
          className="w-full border p-2 rounded"
          placeholder="Contoh: 500.000.000"
          value={priceInput}
          onChange={(e) =>
            setPriceInput(formatNumber(e.target.value))
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium">
          DP (%)
        </label>
        <input
          type="number"
          className="w-full border p-2 rounded"
          value={dpPercent}
          onChange={(e) =>
            setDpPercent(Number(e.target.value))
          }
        />
        <p className="text-xs text-gray-500 mt-1">
          Nominal DP:{' '}
          <strong>{formatRupiah(dpNominal)}</strong>
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium">
          Tenor (tahun)
        </label>
        <input
          type="number"
          className="w-full border p-2 rounded"
          value={tenorYear}
          onChange={(e) =>
            setTenorYear(Number(e.target.value))
          }
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium">
            Bunga Fixed (%)
          </label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            value={fixedRate}
            onChange={(e) =>
              setFixedRate(Number(e.target.value))
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Masa Fixed (tahun)
          </label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            value={fixedYear}
            onChange={(e) =>
              setFixedYear(Number(e.target.value))
            }
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">
          Bunga Floating (%)
        </label>
        <input
          type="number"
          className="w-full border p-2 rounded"
          value={floatingRate}
          onChange={(e) =>
            setFloatingRate(Number(e.target.value))
          }
        />
      </div>

      <button
        onClick={calculate}
        disabled={loading}
        className={`w-full flex items-center justify-center gap-2 bg-black text-white p-2 rounded
          ${
            loading
              ? 'opacity-70 cursor-wait'
              : 'cursor-pointer hover:bg-gray-900'
          }`}
      >
        {loading && (
          <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        )}
        {loading ? 'Menghitung...' : 'Hitung KPR'}
      </button>

      {/* RESULT */}
      {result && (
        <div className="bg-gray-100 p-4 rounded space-y-6 animate-fade-in">
          <h3 className="font-semibold">
            Hasil Simulasi KPR
          </h3>

          <div className="text-sm space-y-1">
            <p>Harga rumah: {formatRupiah(result.price)}</p>
            <p>DP: {formatRupiah(result.dp)}</p>
            <p>
              Pokok pinjaman:{' '}
              {formatRupiah(result.loan)}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-sm space-y-1">
              <p className="font-medium">Periode Fixed</p>
              <p>Bunga: {result.fixed.rate}%</p>
              <p>
                Lama: {result.fixed.year} tahun (
                {result.fixed.month} bulan)
              </p>
              <p>
                Cicilan / bulan:{' '}
                <strong>
                  {formatRupiah(
                    result.fixed.installment
                  )}
                </strong>
              </p>
              <p>
                Total bunga:{' '}
                {formatRupiah(
                  result.fixed.totalInterest
                )}
              </p>
              <p>
                Total bayar:{' '}
                {formatRupiah(
                  result.fixed.totalPayment
                )}
              </p>
            </div>

            <div className="text-sm space-y-1">
              <p className="font-medium">
                Setelah Masuk Floating
              </p>
              <p>
                Sisa pokok:{' '}
                {formatRupiah(
                  result.floating.remainingLoan
                )}
              </p>
              <p>
                Sisa tenor:{' '}
                {result.floating.remainingMonth} bulan
              </p>
              <p>
                Bunga floating:{' '}
                {result.floating.rate}%
              </p>
              <p>
                Estimasi cicilan baru:{' '}
                <strong>
                  {formatRupiah(
                    result.floating.installment
                  )}
                </strong>
              </p>
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <h4 className="font-semibold mb-2">
              Tabel Angsuran per Tahun
            </h4>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-2 py-1">Tahun</th>
                  <th className="border px-2 py-1">Fase</th>
                  <th className="border px-2 py-1">
                    Cicilan / Bulan
                  </th>
                  <th className="border px-2 py-1">
                    Total Bayar / Tahun
                  </th>
                  <th className="border px-2 py-1">
                    Bunga / Tahun
                  </th>
                  <th className="border px-2 py-1">
                    Sisa Pokok
                  </th>
                </tr>
              </thead>
              <tbody>
                {result.yearlySchedule.map(
                  (row: YearlyRow) => (
                    <tr
                      key={row.year}
                      className={
                        row.phase === 'Floating'
                          ? 'bg-red-50'
                          : ''
                      }
                    >
                      <td className="border px-2 py-1 text-center">
                        {row.year}
                      </td>
                      <td className="border px-2 py-1 text-center">
                        {row.phase}
                      </td>
                      <td className="border px-2 py-1">
                        {formatRupiah(
                          row.monthlyInstallment
                        )}
                      </td>
                      <td className="border px-2 py-1">
                        {formatRupiah(
                          row.yearlyPayment
                        )}
                      </td>
                      <td className="border px-2 py-1">
                        {formatRupiah(
                          row.yearlyInterest
                        )}
                      </td>
                      <td className="border px-2 py-1">
                        {formatRupiah(
                          row.remainingLoan
                        )}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}