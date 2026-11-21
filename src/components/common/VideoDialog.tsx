import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { posterFor } from '@/data/content';
import { useLanguage } from '@/contexts/LanguageContext';

interface VideoDialogProps {
  video: { id: string; title: string; subtitle: string; src: string } | null;
  onClose: () => void;
}

/**
 * Demo player shared by the work, journey and case-study pages.
 * Cinema style: the page behind is blurred and dimmed, the clip floats in the
 * middle with a slim title bar above it — no white box around it.
 * The <video> is only mounted while the dialog is open, so a heavy file is
 * never fetched for a demo the visitor has not asked to see.
 */
export const VideoDialog = ({ video, onClose }: VideoDialogProps) => {
  const { t } = useLanguage();

  return (
    <DialogPrimitive.Root open={video !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="video-overlay" />
        <DialogPrimitive.Content className="video-dialog" aria-describedby={video ? 'video-dialog-desc' : undefined}>
          {video && (
            <div className="video-dialog-inner">
              {/* Title bar */}
              <div className="video-dialog-bar">
                <div className="min-w-0">
                  <DialogPrimitive.Title className="truncate text-[17px] font-bold tracking-[-0.02em] text-white">
                    {video.title}
                  </DialogPrimitive.Title>
                  <DialogPrimitive.Description id="video-dialog-desc" className="mt-0.5 truncate text-[13px] text-white/65">
                    {video.subtitle}
                  </DialogPrimitive.Description>
                </div>
                <DialogPrimitive.Close className="video-dialog-close" aria-label={t('video.close')}>
                  <X size={18} />
                </DialogPrimitive.Close>
              </div>

              {/* The clip */}
              <div className="video-dialog-frame">
                <video
                  key={video.id}
                  src={video.src}
                  poster={posterFor(video.src)}
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  // Portrait phone recordings (BVMT) and landscape demos both
                  // fit: capped height, width follows the ratio.
                  className="block max-h-[74vh] w-auto max-w-full"
                />
              </div>

              <p className="video-dialog-hint">
                <kbd>Esc</kbd> {t('video.esc')}
              </p>
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
