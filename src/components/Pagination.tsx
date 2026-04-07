/** Copyright(C) [2026] [Luvina Software Company]
  * 
  * [Pagination.tsx], [Apr 7 ,2026] [ntlong]
  */

'use client';

import { useRouter, useSearchParams } from "next/navigation";

interface Props {
    currentPage: number;
    totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: Props) {
    const router = useRouter();

    if (totalPages <= 1) return null;

    const page = currentPage;
    const lastPage = totalPages - 1;

    const goTo = (p: number) => {
        router.push(`/users?page=${p}`);
    };

    const visiblePages = Array.from(
        new Set([0, page - 1, page, page + 1, lastPage].filter(p => p>= 0 && p <= lastPage))
    ).sort((a, b) => a - b);

    return(
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '24px', justifyContent: 'center'}}>
            <button onClick={() => goTo(page - 1 )}
                disabled = {page === 0}
                style={btnStyle(false, page === 0)}>
                &lt;
            </button>

            {visiblePages.map((p, i) => {
                const prev = visiblePages[i - 1];
                const showEllipsisBefore = prev !== undefined && p - prev > 1;

                return (
                    <span key={p} style={{ display: 'flex', gap: '8px', alignItems: 'center'}}>
                        {showEllipsisBefore && (
                            <button disabled style={btnStyle(false, true)}>...</button>
                        )}
                        <button onClick={() => goTo(p)}
                            style={btnStyle(p === page, false)}>{p + 1}</button>
                    </span>
                )
            })}

            <button onClick={() => goTo(page + 1)}
                disabled = {page === lastPage}
                style={btnStyle(false, page === lastPage)}>
                    &gt;
                </button>
        </div>
    )
}

function btnStyle(isActive: boolean, isDisabled: boolean): React.CSSProperties {
    return {
        padding: '6px 12px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        background: isActive ? '#1E3A5F' : 'white',
        color: isActive ? 'white' : isDisabled ? '#aaa' : '#1E3A5F',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        minWidth: '36px'
    }
}
