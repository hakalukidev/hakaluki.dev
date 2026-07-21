'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';

import { faqs } from '@/app/data/faqs';
import { useSound } from '@/lib/sound-context';
import { cn } from '@/lib/utils';

const ease = [0.16, 1, 0.3, 1] as const;

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { play } = useSound();

  return (
    <div className="faq-list">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <motion.div
            key={faq.question}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: index * 0.05, duration: 0.5, ease }}
            className={cn('faq-item', isOpen && 'faq-item-open')}
          >
            <button
              type="button"
              className="faq-question"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
              onMouseEnter={() => play('hover')}
              onClick={() => {
                play('click');
                setOpenIndex(isOpen ? null : index);
              }}
            >
              <span className="faq-question-index">{String(index + 1).padStart(2, '0')}</span>
              <span className="faq-question-text">{faq.question}</span>
              <span className="faq-question-icon">
                <Plus className="faq-question-icon-svg" size={18} strokeWidth={2} />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-answer-${index}`}
                  key="answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease }}
                  className="faq-answer-wrap"
                >
                  <p className="faq-answer">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
